/* Core */
import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

/* Components */
import { Link } from './Link';

/* Instruments */
import * as gql from '../graphql';
import { LINKS_PER_PAGE } from '../constants';

export const LinkList: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch<{ page: string }>();

    const _getQueryVariables = () => {
        const isNewPage = location.pathname.includes('new');
        const page = parseInt(match.params.page, 10);

        const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
        const first = isNewPage ? LINKS_PER_PAGE : 100;
        const orderBy = isNewPage ? gql.LinkOrderByInput.CreatedAtDesc : null;

        return { first, skip, orderBy };
    };

    const feedQueryResult = gql.useFeedQuery({
        variables: _getQueryVariables(),
    });

    const newLunksSubscriptionResult = gql.useNewLinksSubscriptionSubscription();
    const newVotesSubscriptionResult = gql.useNewVotesSubscriptionSubscription();

    const _updateCacheAfterVote = (store, createVote, linkId) => {
        const isNewPage = location.pathname.includes('new');
        const page = parseInt(match.params.page, 10);

        const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
        const first = isNewPage ? LINKS_PER_PAGE : 100;
        const orderBy = isNewPage ? 'createdAt_DESC' : null;

        const data = store.readQuery({
            query: gql.FeedDocument,
            variables: { first, skip, orderBy },
        });

        const votedLink = data.feed.links.find(link => link.id === linkId);
        votedLink.votes = createVote.link.votes;

        store.writeQuery({ query: gql.FeedDocument, data });
    };

    const _getLinksToRender = data => {
        const isNewPage = location.pathname.includes('new');

        if (isNewPage) {
            return data.feed.links;
        }

        const rankedLinks = data.feed.links.slice();

        rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);

        return rankedLinks;
    };

    const _nextPage = data => {
        const page = parseInt(match.params.page, 10);

        if (page <= data.feed.count / LINKS_PER_PAGE) {
            const nextPage = page + 1;

            history.push(`/new/${nextPage}`);
        }
    };

    const _previousPage = () => {
        const page = parseInt(match.params.page, 10);

        if (page > 1) {
            const previousPage = page - 1;

            history.push(`/new/${previousPage}`);
        }
    };

    const _subscribeToNewLinks = async subscribeToMore => {
        subscribeToMore({
            document: gql.NewLinksSubscriptionDocument,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const newLink = subscriptionData.data.newLink;
                const exists = prev.feed.links.find(
                    ({ id }) => id === newLink.id,
                );

                if (exists) return prev;

                return {
                    ...prev,
                    feed: {
                        links: [newLink, ...prev.feed.links],
                        count: prev.feed.links.length + 1,
                        __typename: prev.feed.__typename,
                    },
                };
            },
        });
    };

    const _subscribeToNewVotes = subscribeToMore => {
        subscribeToMore({
            document: gql.NewVotesSubscriptionDocument,
        });
    };

    if (feedQueryResult.loading) return <div>Fetching</div>;
    if (feedQueryResult.error) return <div>Error</div>;

    // _subscribeToNewLinks(feedQueryResult.subscribeToMore);
    // _subscribeToNewVotes(feedQueryResult.subscribeToMore);

    const linksToRender = _getLinksToRender(feedQueryResult.data);
    const isNewPage = location.pathname.includes('new');
    const pageIndex = match.params.page
        ? (Number(match.params.page) - 1) * LINKS_PER_PAGE
        : 0;

    return (
        <>
            {linksToRender.map((link, index) => (
                <Link
                    key={link.id}
                    link={link}
                    index={index + pageIndex}
                    updateStoreAfterVote={_updateCacheAfterVote}
                />
            ))}
            {isNewPage && (
                <div className="flex ml4 mv3 gray">
                    <div className="pointer mr2" onClick={_previousPage}>
                        Previous
                    </div>
                    <div
                        className="pointer"
                        onClick={() => _nextPage(feedQueryResult.data)}>
                        Next
                    </div>
                </div>
            )}
        </>
    );
};
