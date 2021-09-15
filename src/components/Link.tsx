/* Instruments */
import * as gql from '@/graphql';
import { timeDifferenceForDate } from '@/utils';

export const Link: React.FC<LinkProps> = props => {
    const [voteMutation] = gql.useVoteMutation({
        variables: { linkId: props.link.id },
    });
    const authToken = localStorage.getItem(
        process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME,
    );

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{props.index + 1}.</span>
                {authToken && (
                    <div
                        className="ml1 gray f11"
                        css="cursor: pointer;"
                        onClick={() => voteMutation()}>
                        ▲
                    </div>
                )}
            </div>

            <div className="ml1">
                <div css="font-weight: 500;">
                    {props.link.description} ({props.link.url})
                </div>

                <div className="f6 lh-copy gray">
                    {props.link.votes.length} votes | by{' '}
                    {props.link.postedBy ? props.link.postedBy.name : 'Unknown'}{' '}
                    {timeDifferenceForDate(props.link.createdAt)}
                </div>
            </div>
        </div>
    );
};

/* Types */
interface LinkProps {
    index: number;
    link: gql.LinkFragment;
}
