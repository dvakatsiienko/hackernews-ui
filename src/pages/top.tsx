/* Core */
import { NextPage } from 'next';

/* Components */
import { PostList } from '@/components';

/* Instruments */
import * as gql from '@/graphql';

const TopPostsPage: NextPage = () => {
    return (
        <PostList
            isSubscribed
            orderBy = {{ voteCount: gql.Order_By_Enum.Desc }}
        />
    );
};

export default TopPostsPage;
