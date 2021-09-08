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

/* Instruments */
import { AUTH_TOKEN, DEV_URI } from '../constants';

const subscriptionClient = new SubscriptionClient(`ws://${DEV_URI}`, {
    reconnect: true,
    connectionParams: {
        authToken: localStorage.getItem(AUTH_TOKEN),
    },
});
const wsLink = new WebSocketLink(subscriptionClient);

const httpLink = createHttpLink({
    uri: `http://${DEV_URI}`,
});

const authLink = setContext((operation, previousContext) => {
    const token = localStorage.getItem(AUTH_TOKEN);

    const headers = {
        headers: {
            authorization: token ? `Bearer ${token}` : '',
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
    // @ts-ignores
    wsLink,
    // @ts-ignore
    from([authLink, httpLink]),
);

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
