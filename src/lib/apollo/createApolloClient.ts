/* Core */
import { ApolloClient, InMemoryCache } from '@apollo/client';

/* Instruments */
import { createIsomorphicLink } from './links';

export const createApolloClient = () => {
    const client = new ApolloClient({
        ssrMode: !process.browser,
        link:    createIsomorphicLink(),
        cache:   new InMemoryCache(),
    });

    return client;
};
