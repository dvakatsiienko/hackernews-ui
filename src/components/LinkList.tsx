/* Core */
import { useRouter } from 'next/router';

/* Components */
import { Link } from '@/components';

/* Instruments */
import * as gql from '@/graphql';

const LINKS_PER_PAGE = Number(process.env.NEXT_PUBLIC_LINKS_PER_PAGE);

export const LinkList: React.FC<LinkListProps> = props => {
    const router = useRouter();

    const isPaginated = router.pathname.includes('new');
    const page = parseInt(router.query.page as string);

    const getVariables = (): gql.FeedQueryVariables => {
        const skip = isPaginated ? (page - 1) * LINKS_PER_PAGE : 0;
        const take = isPaginated ? LINKS_PER_PAGE : 100;

        return {
            take,
            skip,
            orderBy: {
                createdAt: gql.Sort.Desc,
                description: gql.Sort.Desc,
                url: gql.Sort.Desc,
            },
            filter: '',
        };
    };

    const feedQuery = gql.useFeedQuery({ variables: getVariables() });

    if (props.subscription) {
        feedQuery.subscribeToMore<gql.LinkCreatedSubscription>({
            document: gql.LinkCreatedDocument,
            updateQuery: (prev, opts) => {
                const { subscriptionData } = opts;

                if (!subscriptionData.data) return prev;

                const newLink = subscriptionData.data.linkCreated;
                const isExists = prev.feed.links.find(
                    link => link.id === newLink.id,
                );

                if (isExists) return prev;

                const result = {
                    ...prev,
                    feed: {
                        __typename: prev.feed.__typename,
                        links: [newLink, ...prev.feed.links],
                        count: prev.feed.links.length + 1,
                    },
                };

                return result;
            },
        });
    }

    const getSortedLinks = () => {
        if (isPaginated) {
            return feedQuery.data?.feed.links ?? [];
        }

        const sortedLinks = feedQuery.data?.feed.links.slice() ?? [];

        sortedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);

        return sortedLinks;
    };

    const linksListJSX = getSortedLinks().map((link, index) => {
        return <Link key={link.id} link={link} index={index + 0} />;
    });

    const goPrev = () => {
        if (page > 1) {
            router.push(`/new/${page - 1}`);
        }
    };

    const goNext = () => {
        if (page <= feedQuery.data?.feed.count / LINKS_PER_PAGE) {
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

            {linksListJSX}

            {isPaginated && (
                <div className="flex ml4 mv3 gray">
                    <div className="pointer mr2" onClick={goPrev}>
                        Previous
                    </div>
                    <div className="pointer" onClick={goNext}>
                        Next
                    </div>
                </div>
            )}
        </>
    );
};

/* Types */
interface LinkListProps {
    subscription?: boolean;
}
