/* Core */
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

/* Components */
import { PostList, CreatePostForm } from '@/components';

/* Instruments */
import { vars } from '@/lib/apollo';

const CreatePostPage: NextPage = () => {
    const router = useRouter();
    const isAuthenticated = vars.useIsAuthenticated();

    useEffect(() => {
        !isAuthenticated && router.replace('/new/1');
    }, [ isAuthenticated ]);

    return (
        <>
            <CreatePostForm />

            <PostList subscription />
        </>
    );
};

export default CreatePostPage;
