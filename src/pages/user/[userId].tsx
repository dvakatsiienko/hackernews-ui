/* Core */
import { NextPage } from 'next';
import { useRouter } from 'next/router';

/* Components */
import { UserProfile } from '@/components';

/* Instruments */
import * as gql from '@/graphql';

const NewPostsPaginatedPage: NextPage = () => {
    const router = useRouter();
    const userId = router.query.userId as string;

    const userQuery = gql.useUserQuery({
        variables: { id: userId },
    });

    return <UserProfile user = { userQuery.data?.user } />;
};

export default NewPostsPaginatedPage;
