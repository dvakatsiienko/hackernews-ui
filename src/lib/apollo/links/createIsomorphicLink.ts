/* Core */
import { split, from } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import loggerLink from 'apollo-link-logger';

/* Instruments */
import { errorLink } from './errorLink';
import { authLink } from './authLink';
import { httpLink } from './httpLink';
import { wsLink } from './wsLink';

const baseLinks = [ loggerLink, errorLink ];
const httpLinks = from([ ...baseLinks, authLink, httpLink ]);

export const createIsomorphicLink = () => {
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
