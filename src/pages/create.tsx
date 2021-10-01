/* Core */
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

/* Components */
import { PostList, CreatePostForm } from '@/components';

const CreatePostPage: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('/new/1');
    }, []);

    return (
        <>
            <CreatePostForm />

            <PostList subscription />
        </>
    );
};

export default CreatePostPage;
