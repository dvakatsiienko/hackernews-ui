/* Core */
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    split,
    from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import debug from 'debug';

/* Instruments */
import { loggerLink } from './apollo-link-logger';

const logGql = debug('[GraphQL error]');

const GQL_HTTP_URL = process.env.NEXT_PUBLIC_GQL_HTTP_URL;
const GQL_WS_URL = process.env.NEXT_PUBLIC_GQL_WS_URL;
const AUTH_TOKEN_NAME = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;

const subscriptionClient = process.browser
    ? new SubscriptionClient(GQL_WS_URL, {
          reconnect: true,
          connectionParams: {
              authToken: process.browser
                  ? localStorage.getItem(AUTH_TOKEN_NAME)
                  : null,
          },
      })
    : null;

const wsLink = process.browser ? new WebSocketLink(subscriptionClient) : null;

const httpLink = new HttpLink({
    uri: GQL_HTTP_URL,
    credentials: 'same-origin',
});

const authLink = setContext((_, prevCtx) => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);

    const ctx = {
        headers: {
            ...prevCtx.headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    };

    return ctx;
});

const errorLink = onError(net => {
    logGql('Operation:', net.operation);
    logGql('Response:', net.response);
    logGql(`Errors quantity: ${net.graphQLErrors?.length}`);

    if (net.graphQLErrors) {
        for (const error of net.graphQLErrors) {
            logGql(
                `Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
            );
        }
    }

    if (net.networkError) {
        logGql(`Network error: ${net.networkError}`);
    }
});

const links = from([loggerLink, errorLink, authLink, httpLink]);

export const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: false // ! process.browser
            ? split(
                  operation => {
                      const mainDefinition = getMainDefinition(operation.query);

                      return (
                          process.browser &&
                          mainDefinition.kind === 'OperationDefinition' &&
                          mainDefinition.operation === 'subscription'
                      );
                  },
                  wsLink,
                  links,
              )
            : links,
        cache: new InMemoryCache(),
    });
};
