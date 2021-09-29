/* Core */
import { useRouter } from 'next/router';

/* Components */
import { Post } from '@/components';

/* Instruments */
import * as gql from '@/graphql';

const POSTS_PER_PAGE = Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE);

export const PostList: React.FC<PostListProps> = props => {
    const router = useRouter();

    const isPaginated = router.pathname.includes('new');
    const page = parseInt(router.query.page as string);

    const getVariables = (): gql.FeedQueryVariables => {
        const skip = isPaginated ? (page - 1) * POSTS_PER_PAGE : 0;
        const take = isPaginated ? POSTS_PER_PAGE : 100;

        return {
            take,
            skip,
        };
    };

    const feedQuery = gql.useFeedQuery({ variables: getVariables() });

    if (props.subscription) {
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
                        count:      prev.feed.posts.length + 1,
                    },
                };

                return result;
            },
        });
    }

    const getSortedPosts = () => {
        if (isPaginated) {
            return feedQuery.data?.feed.posts ?? [];
        }

        const sortedPosts = feedQuery.data?.feed.posts.slice() ?? [];

        sortedPosts.sort((p1, p2) => p2.votes.length - p1.votes.length);

        return sortedPosts;
    };

    const postListJSX = getSortedPosts().map((link, index) => {
        return <Post index = { index + 0 } key = { link.id } post = { link } />;
    });

    const goPrev = () => {
        if (page > 1) {
            router.push(`/new/${page - 1}`);
        }
    };

    const goNext = () => {
        if (page <= feedQuery.data?.feed.count / POSTS_PER_PAGE) {
            const nextPage = page + 1;

            router.push(`/new/${nextPage}`);
        }
    };

    return (
        <>
            {feedQuery.loading && <p>Loading...</p>}
            {feedQuery.error && (
                <pre>{JSON.stringify(feedQuery.error, null, 2)}</pre>
            )}

            {postListJSX}

            {isPaginated && (
                <div className = 'flex ml4 mv3 gray'>
                    <div className = 'pointer mr2' onClick = { goPrev }>
                        Previous
                    </div>
                    <div className = 'pointer' onClick = { goNext }>
                        Next
                    </div>
                </div>
            )}
        </>
    );
};

/* Types */
interface PostListProps {
    subscription?: boolean;
}
