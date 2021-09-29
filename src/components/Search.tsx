/* Core */
import { useState, useEffect } from 'react';
import { NetworkStatus } from '@apollo/client';
import { useForm } from 'react-hook-form';
import waait from 'waait';

/* Components */
import { Post } from './Post';

/* Instruments */
import * as gql from '@/graphql';

export const Search: React.FC = () => {
    const [ isRefetching, setIsRefetching ] = useState(false);
    const form = useForm<gql.FeedQueryVariables>({
        defaultValues: { filter: '' },
    });

    const [ search, feedQuery ] = gql.useFeedLazyQuery({
        notifyOnNetworkStatusChange: true,
    });

    useEffect(search, []);

    const submit = form.handleSubmit(async values => {
        if (form.getValues().filter.length) {
            setIsRefetching(true);
            await waait(1000);
            feedQuery.refetch(values);
            setIsRefetching(false);
        }
    });

    const isFirstFetch = feedQuery.networkStatus === NetworkStatus.loading;
    const isDisabled = feedQuery.loading || isRefetching;

    const postListJSX = feedQuery.data?.feed.posts.map((post, index) => {
        return <Post index = { index + 0 } key = { post.id } post = { post } />;
    }) ?? [];

    return (
        <>
            <form onSubmit = { submit }>
                <fieldset disabled = { isDisabled }>
                    Search
                    <input name = 'filter' { ...form.register('filter') } />
                    &nbsp;
                    <button type = 'submit'>OK</button>
                    {isRefetching && '⏳'}
                </fieldset>
            </form>

            {isFirstFetch ? <h5>Loading...</h5> : postListJSX}
        </>
    );
};
