/* Core */
import { NextPage } from 'next';

/* Components */
import { PostList, CreatePostForm } from '@/components';

const CreatePostPage: NextPage = () => {
    return (
        <>
            <CreatePostForm />

            <PostList subscription />
        </>
    );
};

export default CreatePostPage;
