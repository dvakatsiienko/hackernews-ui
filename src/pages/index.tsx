/* Core */
import { NextPage } from 'next';

/* Components */
import { Link } from '@/components';

/* Instruments */
import * as gql from '@/graphql';

const IndexPage: NextPage = () => {
    const feedQuery = gql.useFeedQuery();

    if (feedQuery.loading) return <div>Fetching</div>;
    if (feedQuery.error) return <div>Error</div>;

    const linksListJSX = feedQuery.data.feed.links.map((link, index) => {
        return <Link key={link.id} link={link} index={index + 0} />;
    });

    return (
        <>
            {linksListJSX}

            {/* {isNewPage && (
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
            )} */}
        </>
    );
};

export default IndexPage;
