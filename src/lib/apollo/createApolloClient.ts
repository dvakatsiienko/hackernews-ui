/* Core */
import { ApolloClient, InMemoryCache, split, from } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import loggerLink from 'apollo-link-logger';

/* Instruments */
import { errorLink, authLink, httpLink, createWSLink } from './links';

const baseLinks = [loggerLink, errorLink];
const httpLinks = from([...baseLinks, authLink, httpLink]);

const createIsomorphicLink = () => {
    return process.browser
        ? split(
              operation => {
                  const mainDefinition = getMainDefinition(operation.query);

                  return (
                      mainDefinition.kind === 'OperationDefinition' &&
                      mainDefinition.operation === 'subscription'
                  );
              },
              from([...baseLinks, createWSLink()]),
              httpLinks,
          )
        : httpLinks;
};

export const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        // link: links,
        link: createIsomorphicLink(),
        cache: new InMemoryCache(),
    });
};
