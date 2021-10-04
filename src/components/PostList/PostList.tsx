/* Core */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from '@geist-ui/react';
import styled from 'styled-components';
import waait from 'waait';

/* Components */
import { Post } from './Post';

/* Instruments */
import * as gql from '@/graphql';
import { useFeedVariables } from '@/utils';

export const PostList: React.FC<PostListProps> = props => {
    const { isPaginated } = props;

    const [ isFetchingMore, setIsFetchingMore ] = useState(false);
    const router = useRouter();
    const {
        page,
        variables: feedVariables,
        POSTS_PER_PAGE,
    } = useFeedVariables({ isPaginated });

    const feedQuery = gql.useFeedQuery({
        variables:                   feedVariables,
        fetchPolicy:                 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });

    if (props.isSubscribed && process.browser) {
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
        let orderNumber = index + 1;

        if (isPaginated) {
            orderNumber = feedVariables.skip + index + 1;
        }

        return <Post key = { link.id } orderNumber = { orderNumber } post = { link } />;
    });

    const totalPages = Math.ceil(feedQuery.data?.feed.count / POSTS_PER_PAGE);

    const setPage = async (nextPage: number) => {
        // const isPaginated = router.pathname.includes('new');
        setIsFetchingMore(true);

        const skip = isPaginated ? (nextPage - 1) * POSTS_PER_PAGE : 0;
        const take = isPaginated ? POSTS_PER_PAGE : 25;

        await feedQuery.fetchMore({ variables: { skip, take } });
        await waait(100);

        router.push(`/new/${nextPage}`);
        setIsFetchingMore(false);
    };

    return (
        <S.Container>
            {/* {feedQuery.loading && <p>Loading...</p>} */}

            <S.List>{postListJSX}</S.List>

            <S.Footer $isDisabled = { isFetchingMore }>
                {feedQuery.data && !isNaN(totalPages) && isPaginated && (
                    <Pagination
                        count = { totalPages }
                        initialPage = { page }
                        limit = { 7 }
                        page = { page }
                        onChange = { setPage }
                    />
                )}
            </S.Footer>
        </S.Container>
    );
};

/* Styles */
const S = {
    Container: styled.section`
        --footer-height: 40px;

        display: grid;
        grid-template-rows: 1fr var(--footer-height);
        gap: var(--container-gap);

        overflow: hidden;
    `,
    List: styled.ul`
        max-height: calc(
            100vh - (2 * var(--layout-offset)) - 41px -
                (2 * var(--container-v-padding)) - var(--nav-height) -
                (2 * var(--container-gap)) - var(--footer-height)
        );
        overflow-y: scroll;

        /* Hide scrollbar for Chrome */
        &::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for IE and Edge */
        -ms-overflow-style: none;
    `,
    Footer: styled.footer<FooterProps>`
        display: flex;
        justify-content: center;
        align-items: center;

        & nav {
            & li {
                margin-bottom: 0;

                ${p => p.$isDisabled && 'cursor: not-allowed;'}

                & button {
                    ${p => p.$isDisabled && 'color: grey; pointer-events: none;'}

                    &.active {
                        ${p => p.$isDisabled
                            && 'color: white; background-color: grey;'}
                    }
                }
            }
        }
    `,
};

/* Types */
interface PostListProps {
    isPaginated?: boolean;
    isSubscribed?: boolean;
}

interface FooterProps {
    $isDisabled: boolean;
}
