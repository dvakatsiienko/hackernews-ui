/* Instruments */
import * as gql from '@/graphql';
import { timeDifferenceForDate } from '@/utils';

export const Post: React.FC<PostProps> = props => {
    const [ voteMutation ] = gql.useVoteMutation({
        variables: { postId: props.post.id },
    });
    const authToken = localStorage.getItem(
        process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME,
    );

    return (
        <div className = 'flex mt2 items-start'>
            <div className = 'flex items-center'>
                <span className = 'gray'>{props.index + 1}.</span>
                {authToken && (
                    <div
                        className = 'ml1 gray f11'
                        css = 'cursor: pointer;'
                        onClick = { () => voteMutation() }
                    >
                        ▲
                    </div>
                )}
            </div>

            <div className = 'ml1'>
                <div css = 'font-weight: 500;'>
                    {props.post.description} ({props.post.url})
                </div>

                <div className = 'f6 lh-copy gray'>
                    {props.post.votes.length} votes | by{' '}
                    {props.post.postedBy ? props.post.postedBy.name : 'Unknown'}{' '}
                    {timeDifferenceForDate(props.post.createdAt)}
                </div>
            </div>
        </div>
    );
};

/* Types */
interface PostProps {
    index: number;
    post: gql.PostFragment;
}
