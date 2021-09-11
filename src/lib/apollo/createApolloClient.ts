/* Core */
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/link-error';
import debug from 'debug';

/* Instruments */
import { loggerLink } from './apollo-link-logger';

const logGql = debug('[GraphQL error]');

export const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: from([
            loggerLink,
            onError(net => {
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
            }),

            new HttpLink({
                uri: process.env.NEXT_PUBLIC_GQL_HTTP_URL,
                credentials: 'same-origin',
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYzMTM3OTU3Nn0.actL0xT5mcPIii2ohihtBLTJIjiGndQ2k4nWIqmwEkc',
                },
            }),
        ]),
        cache: new InMemoryCache(),
    });
};
