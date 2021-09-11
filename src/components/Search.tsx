/* Core */
import { useState, useEffect } from 'react';
import { NetworkStatus } from '@apollo/client';

/* Components */
import { Link } from './Link';

/* Instruments */
import * as gql from '../graphql';

export const Search: React.FC = () => {
    const [filter, setFilter] = useState('test');

    // const feedSearchQueryResult = gql.useFeedSearchQuery({
    //     notifyOnNetworkStatusChange: true,
    //     variables: {
    //         filter,
    //     },
    // });

    useEffect(() => {
        // if (feedSearchQueryResult.data) {
        //     feedSearchQueryResult.refetch({
        //         filter,
        //     });
        // }
    }, [filter]);

    // const isFirstFetch =
    //     feedSearchQueryResult.networkStatus === NetworkStatus.loading;

    return (
        <div>
            <div>
                Search
                <input type="text" onChange={e => setFilter(e.target.value)} />
                &nbsp;
                <button>OK</button>
                {/* {feedSearchQueryResult.networkStatus ===
                    NetworkStatus.refetch && '⏳'} */}
            </div>
            {/* {isFirstFetch ? (
                <p>Loading...</p>
            ) : (
                feedSearchQueryResult.data?.feed?.links?.map((link, index) => (
                    <Link key={link.id} link={link} index={index} />
                ))
            )} */}
        </div>
    );
};
