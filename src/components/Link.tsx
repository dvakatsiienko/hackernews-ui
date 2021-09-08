/* Core */
import React from 'react';
import { useMutation, gql } from '@apollo/client';

/* Instruments */
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';

export const Link = props => {
    const [vote, voteMeta] = useMutation(VOTE_MUTATION, {
        variables: { linkId: props.link.id },
    });
    const authToken = localStorage.getItem(AUTH_TOKEN);

    const voteMut = () => {
        vote({
            update(cache, response) {
                props.updateStoreAfterVote(
                    cache,
                    response.data.vote,
                    props.link.id,
                );
            },
        });
    };

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{props.index + 1}.</span>
                {authToken && (
                    <div className="ml1 gray f11" onClick={voteMut}>
                        ▲
                    </div>
                )}
            </div>
            <div className="ml1">
                <div>
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

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {
                id
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`;
