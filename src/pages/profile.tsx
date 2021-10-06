/* Core */
import { NextPage } from 'next';

/* Components */
import { UserProfile } from '@/components';

/* Instruments */
import * as gql from '@/graphql';
import { getJwtToken } from '@/utils';

const MyProfilePage: NextPage = () => {
    const authQuery = gql.useAuthenticateQuery({
        variables: { token: getJwtToken() },
    });

    return <UserProfile isEditable user = { authQuery.data?.authenticate } />;
};

export default MyProfilePage;
