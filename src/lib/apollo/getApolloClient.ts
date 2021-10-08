/* Core */
import { GetServerSidePropsContext } from 'next';
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject
} from '@apollo/client';

/* Instruments */
import { createIsomorphicLink } from './links';
import { typePolicies } from './typePolicies';

export const getApolloClient = (
    ctx?: GetServerSidePropsContext,
    initialState?: NormalizedCacheObject,
) => {
    if (ctx?.req?.cookies) {
        // console.log('COOKIES FOUND', ctx?.req.cookies);
        // const cookie = ctx.req.cookies[ KEYSTONE_COOKIE_NAME ];
        // headers.cookie = `${KEYSTONE_COOKIE_NAME}=${cookie}`;
    } else {
        // console.log('COOKIES NOT FOUND');
    }

    const client = new ApolloClient({
        ssrMode: !process.browser,
        link:    createIsomorphicLink(),
        cache:   new InMemoryCache({ typePolicies }).restore(initialState || {}),
    });

    return client;
};
