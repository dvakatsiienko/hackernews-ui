/* Core */
import { NextPage } from 'next';
import { useState, useEffect } from 'react';

/* Components */
import { SearchPostForm, PostList } from '@/components';

/* Instruments */
import * as gql from '@/graphql';

const SearchPage: NextPage = () => {
    const [ isRefetching, setIsRefetching ] = useState(false);
    const feedLazyQuery = gql.useFeedLazyQuery({
        notifyOnNetworkStatusChange: true,
        variables:                   { take: 6 },
    });
    const [ lazySearch, feedQuery ] = feedLazyQuery;

    useEffect(lazySearch, []);

    const isDisabled = feedQuery.loading || isRefetching;

    // const postListJSX = feedQuery.data?.feed.posts.map((post, index) => {
    //     return <Post key = { post.id } orderNumber = { index + 0 } post = { post } />;
    // }) ?? [];

    return (
        <>
            <SearchPostForm
                feedLazyQuery = { feedLazyQuery }
                isDisabled = { isDisabled }
                isRefetching = { isRefetching }
                setIsRefetching = { setIsRefetching }
            />

            <PostList postList = { feedQuery.data?.feed.posts ?? [] } />
        </>
    );
};

export default SearchPage;
