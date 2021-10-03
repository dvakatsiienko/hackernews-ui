/* Core */
import {
    Card, CardProps, Link, Themes
} from '@geist-ui/react';
import styled from 'styled-components';

/* Instruments */
import * as gql from '@/graphql';
import { vars } from '@/lib/apollo';
import { timeDifferenceForDate } from '@/utils';

export const Post: React.FC<PostProps> = props => {
    const isAuthenticated = vars.useIsAuthenticated();
    const [ voteMutation ] = gql.useVoteMutation({
        variables: { postId: props.post.id },
    });
    const [ unvoteMutation ] = gql.useUnvoteMutation({
        variables: { postId: props.post.id },
    });

    return (
        <S.Container>
            <S.Header>
                <S.OrderNumber>{props.orderNumber}.</S.OrderNumber>
                <Link
                    color
                    href = { props.post.url }
                    rel = 'noreferrer noopener'
                    target = '_blank'
                >
                    {props.post.description}
                </Link>
            </S.Header>

            <S.Footer>
                {isAuthenticated && (
                    <S.Upvote
                        $isVotedByMe = { props.post.isVotedByMe }
                        onClick = { () => (props.post.isVotedByMe
                            ? unvoteMutation()
                            : voteMutation()) }
                    >
                        ▲
                    </S.Upvote>
                )}
                <span>
                    <b>{props.post.votes.length}</b>&nbsp;
                </span>
                votes | by{' '}
                {props.post.postedBy ? props.post.postedBy.name : 'Unknown'} |{' '}
                {timeDifferenceForDate(props.post.createdAt)}
            </S.Footer>
        </S.Container>
    );
};

/* Styles */
const { palette } = Themes.getPresets()[ 0 ];

const S = {
    Container: styled(Card)<CardProps>`
        --font-size: 15px;

        &&:not(:last-child) {
            margin-bottom: 7px;
        }
    `,
    Header: styled.header`
        display: flex;
        user-select: none;
        gap: 3px;

        && a {
            display: inline-block;
            font-size: var(--font-size);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    `,
    OrderNumber: styled.span`
        font-size: var(--font-size);
        font-weight: 500;
        color: ${palette.accents_4};
    `,
    Upvote: styled.span<UpvoteProps>`
        width: 11px;
        margin-right: 5px;
        cursor: pointer;
        user-select: none;
        color: ${props => (props.$isVotedByMe ? palette.accents_7 : palette.accents_3)};

        &:hover {
            color: ${palette.accents_7};
        }
    `,
    Footer: styled.footer`
        color: ${palette.accents_5};
        font-size: 14px;
    `,
};

/* Types */
interface PostProps {
    orderNumber: number;
    post: gql.PostFragment;
}

interface UpvoteProps {
    $isVotedByMe: boolean;
}
