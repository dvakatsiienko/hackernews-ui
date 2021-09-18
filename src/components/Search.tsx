/* Core */
import { useState, useEffect } from 'react';
import { NetworkStatus } from '@apollo/client';
import { useForm } from 'react-hook-form';
import waait from 'waait';

/* Components */
import { Link } from './Link';

/* Instruments */
import * as gql from '@/graphql';

export const Search: React.FC = () => {
    const [isRefetching, setIsRefetching] = useState(false);
    const form = useForm<gql.FeedQueryVariables>({
        defaultValues: { filter: '' },
    });

    const [search, feedQuery] = gql.useFeedLazyQuery({
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        search();
    }, []);

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

    return (
        <>
            <form onSubmit={submit}>
                <fieldset disabled={isDisabled}>
                    Search
                    <input name="filter" {...form.register('filter')} />
                    &nbsp;
                    <button>OK</button>
                    {isRefetching && '⏳'}
                </fieldset>
            </form>

            {isFirstFetch ? (
                <h5>Loading...</h5>
            ) : (
                feedQuery.data?.feed.links.map((link, index) => (
                    <Link key={link.id} link={link} index={index} />
                ))
            )}
        </>
    );
};
