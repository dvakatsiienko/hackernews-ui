/* Core */
import { NextPage, GetStaticProps } from 'next';

/* Components */
import { PostList } from '@/components';

/* Instruments */
import * as gql from '@/graphql';
import { getApolloClient } from '@/lib/apollo/getApolloClient';

const orderBy = { voteCount: gql.Order_By_Enum.Desc };

const TopPostsPage: TopPostsPageProps = props => {
    const feedQuery = gql.useFeedQuery({
        variables:   { take: 25, orderBy },
        fetchPolicy: 'cache-and-network',
    });

    if (process.browser) {
        feedQuery.subscribeToMore<gql.PostCreatedSubscription>({
            document:    gql.PostCreatedDocument,
            updateQuery: (prev, opts) => {
                const { subscriptionData } = opts;

                if (!subscriptionData.data) return prev;

                const newPost = subscriptionData.data.postCreated;

                const isExists = prev.feed.posts.find(
                    post => post.id === newPost.id,
                );

                if (isExists) return prev;

                const result = {
                    ...prev,
                    feed: {
                        __typename: prev.feed.__typename,
                        posts:      [ newPost, ...prev.feed.posts ],
                        count:      prev.feed.count + 1,
                    },
                };

                return result;
            },
        });
    }

    const postList = feedQuery.data?.feed.posts ?? props.feed.posts ?? [];

    return <PostList orderBy = { orderBy } postList = { postList } />;
};

export const getStaticProps: GetStaticProps = async ctx => {
    // @ts-ignore
    const apolloClient = getApolloClient(ctx);

    const feedQuery = await apolloClient.query<gql.FeedQuery>({
        variables: { take: 25, orderBy },
        query:     gql.FeedDocument,
    });

    return { props: feedQuery.data, revalidate: 1 };
};

/* Types */
export type TopPostsPageProps = NextPage<{ feed: gql.Feed }>;

export default TopPostsPage;
