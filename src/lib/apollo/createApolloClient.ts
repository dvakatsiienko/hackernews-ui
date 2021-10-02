/* Core */
import { ApolloClient, InMemoryCache } from '@apollo/client';

/* Instruments */
import { createIsomorphicLink } from './links';
import { typePolicies } from './typePolicies';

export const createApolloClient = () => {
    const client = new ApolloClient({
        ssrMode: !process.browser,
        link:    createIsomorphicLink(),
        cache:   new InMemoryCache({ typePolicies }),
    });

    return client;
};
