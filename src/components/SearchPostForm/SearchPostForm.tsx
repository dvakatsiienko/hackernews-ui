/* Core */
import { useState, useEffect } from 'react';
import { NetworkStatus } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Button } from '@geist-ui/react';
import waait from 'waait';

/* Components */
import { Post } from '../Post';
import { Fieldset, Input } from '../Form';

/* Instruments */
import * as gql from '@/graphql';
import { resolver } from './resolver';

export const SearchPostForm: React.FC = () => {
    const [ isRefetching, setIsRefetching ] = useState(false);
    const form = useForm({
        resolver,
        defaultValues: { filter: '' },
    });

    const [ search, feedQuery ] = gql.useFeedLazyQuery({
        notifyOnNetworkStatusChange: true,
    });

    useEffect(search, []);

    const submit = form.handleSubmit(async values => {
        setIsRefetching(true);
        await waait(1000);
        feedQuery.refetch(values);
        setIsRefetching(false);
    });

    const isFirstFetch = feedQuery.networkStatus === NetworkStatus.loading;
    const isDisabled = feedQuery.loading || isRefetching;

    const postListJSX = feedQuery.data?.feed.posts.map((post, index) => {
        return <Post index = { index + 0 } key = { post.id } post = { post } />;
    }) ?? [];

    return (
        <>
            <form onSubmit = { submit }>
                <Fieldset disabled = { isDisabled }>
                    <h2 className = 'mv3'>Search for a post</h2>
                    <Input
                        formState = { form.formState }
                        placeholder = 'Search...'
                        register = { form.register('filter') }
                    />
                    &nbsp;
                    <Button auto htmlType = 'submit'>
                        GO
                        {isRefetching && '⏳'}
                    </Button>
                </Fieldset>
            </form>

            {isFirstFetch ? <h5>Loading...</h5> : postListJSX}
        </>
    );
};
