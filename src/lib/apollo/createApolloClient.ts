/* Core */
import {
    ApolloClient, InMemoryCache, split, from
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import loggerLink from 'apollo-link-logger';

/* Instruments */
import {
    errorLink, authLink, httpLink, wsLink
} from './links';

const baseLinks = [ loggerLink, errorLink ];
const httpLinks = from([ ...baseLinks, authLink, httpLink ]);

const createIsomorphicLink = () => {
    const link = split(
        operation => {
            const mainDefinition = getMainDefinition(operation.query);

            return (
                process.browser
                && mainDefinition.kind === 'OperationDefinition'
                && mainDefinition.operation === 'subscription'
            );
        },
        from([ ...baseLinks, wsLink ]),
        httpLinks,
    );

    return link;
};

export const createApolloClient = () => {
    const client = new ApolloClient({
        ssrMode: !process.browser,
        link:    createIsomorphicLink(),
        cache:   new InMemoryCache(),
    });

    return client;
};
