/* Core */
import { NextPage } from 'next';

/* Components */
import { PostList } from '@/components';

/* Instruments */
import * as gql from '@/graphql';

const TopPostsPage: NextPage = () => {
    const orderBy = { voteCount: gql.Order_By_Enum.Desc };

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

    return (
        <PostList
            orderBy = { orderBy }
            postList = { feedQuery.data?.feed.posts ?? [] }
        />
    );
};

export default TopPostsPage;
