/* Core */
import { NextPage } from 'next';

/* Components */
import { Link } from '@/components';

/* Instruments */
import * as gql from '@/graphql';

const LINKS_PER_PAGE = Number(process.env.NEXT_PUBLIC_LINKS_PER_PAGE);
const SKIP = 0;
const orderBy = { createdAt: 'desc' };

const NewLinksPage: NextPage = () => {
    // const history = useHistory();
    // const location = useLocation();
    // const match = useRouteMatch<{ page: string }>();

    // const _getQueryVariables = () => {
    //     const isNewPage = location.pathname.includes('new');
    //     const page = parseInt(match.params.page, 10);

    //     const skip = isNewPage ? (page - 1) * NEXT_PUBLIC_LINKS_PER_PAGE : 0;
    //     const first = isNewPage ? NEXT_PUBLIC_LINKS_PER_PAGE : 100;
    //     const orderBy = isNewPage ? gql.LinkOrderByInput.CreatedAtDesc : null;

    //     return { first, skip, orderBy };
    // };

    const feedQuery = gql.useFeedQuery({
        // variables: _getQueryVariables(),
    });

    // const newLunksSubscriptionResult =
    //     gql.useNewLinksSubscriptionSubscription();
    // const newVotesSubscriptionResult =
    //     gql.useNewVotesSubscriptionSubscription();

    // const _updateCacheAfterVote = (store, createVote, linkId) => {
    //     const isNewPage = location.pathname.includes('new');
    //     const page = parseInt(match.params.page, 10);
    //     const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    //     const first = isNewPage ? LINKS_PER_PAGE : 100;
    //     const orderBy = isNewPage ? 'createdAt_DESC' : null;
    //     const data = store.readQuery({
    //         query: gql.FeedDocument,
    //         variables: { first, skip, orderBy },
    //     });
    //     const votedLink = data.feed.links.find(link => link.id === linkId);
    //     votedLink.votes = createVote.link.votes;
    //     store.writeQuery({ query: gql.FeedDocument, data });
    // };

    const _getLinksToRender = () => {
        const links = feedQuery.data.feed.links;

        const isNewPage = location.pathname.includes('new');

        if (isNewPage) {
            return links;
        }

        const rankedLinks = links.slice();

        rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);

        return rankedLinks;
    };

    const _nextPage = data => {
        // const page = parseInt(match.params.page, 10);
        // if (page <= data.feed.count / LINKS_PER_PAGE) {
        //     const nextPage = page + 1;
        //     history.push(`/new/${nextPage}`);
        // }
    };

    const _previousPage = () => {
        // const page = parseInt(match.params.page, 10);
        // if (page > 1) {
        //     const previousPage = page - 1;
        //     history.push(`/new/${previousPage}`);
        // }
    };

    // const _subscribeToNewLinks = async subscribeToMore => {
    //     subscribeToMore({
    //         document: gql.NewLinksSubscriptionDocument,
    //         updateQuery: (prev, { subscriptionData }) => {
    //             if (!subscriptionData.data) return prev;

    //             const newLink = subscriptionData.data.newLink;
    //             const exists = prev.feed.links.find(
    //                 ({ id }) => id === newLink.id,
    //             );

    //             if (exists) return prev;

    //             return {
    //                 ...prev,
    //                 feed: {
    //                     links: [newLink, ...prev.feed.links],
    //                     count: prev.feed.links.length + 1,
    //                     __typename: prev.feed.__typename,
    //                 },
    //             };
    //         },
    //     });
    // };

    // const _subscribeToNewVotes = subscribeToMore => {
    //     subscribeToMore({
    //         document: gql.NewVotesSubscriptionDocument,
    //     });
    // };

    if (feedQuery.loading) return <div>Fetching</div>;
    if (feedQuery.error) return <div>Error</div>;

    // _subscribeToNewLinks(feedQueryResult.subscribeToMore);
    // _subscribeToNewVotes(feedQueryResult.subscribeToMore);

    const linksToRender = _getLinksToRender();
    const isNewPage = location.pathname.includes('new');
    // const pageIndex = match.params.page
    //     ? (Number(match.params.page) - 1) * LINKS_PER_PAGE
    //     : 0;
    const pageIndex = 0;

    const linksListJSX = linksToRender.map((link, index) => {
        return <Link key={link.id} link={link} index={index + pageIndex} />;
    });

    return (
        <>
            {linksListJSX}

            {isNewPage && (
                <div className="flex ml4 mv3 gray">
                    <div className="pointer mr2" onClick={_previousPage}>
                        Previous
                    </div>
                    <div
                        className="pointer"
                        onClick={() => _nextPage(feedQuery.data)}>
                        Next
                    </div>
                </div>
            )}
        </>
    );
};

export default NewLinksPage;
