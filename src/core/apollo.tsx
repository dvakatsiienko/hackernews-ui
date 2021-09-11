/* Core */
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
    from,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/link-context';
import { WebSocketLink } from '@apollo/link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const GQL_HTTP_URL = process.env.NEXT_PUBLIC_GQL_HTTP_URL;
const GQL_WS_URL = process.env.NEXT_PUBLIC_GQL_WS_URL;
const AUTH_TOKEN_NAME = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;

// !TODO: replace to ws:// protocol
const subscriptionClient = new SubscriptionClient(GQL_WS_URL, {
    reconnect: true,
    connectionParams: {
        authToken: localStorage.getItem(AUTH_TOKEN_NAME),
    },
});
const wsLink = new WebSocketLink(subscriptionClient);

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GQL_HTTP_URL,
});

const authLink = setContext(() => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);

    const headers = {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };

    return headers;
});

const link = split(
    operation => {
        const mainDefinition = getMainDefinition(operation.query);

        return (
            mainDefinition.kind === 'OperationDefinition' &&
            mainDefinition.operation === 'subscription'
        );
    },
    wsLink,
    from([authLink, httpLink]),
);

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
