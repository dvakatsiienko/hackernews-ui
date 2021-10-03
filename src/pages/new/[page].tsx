/* Core */
import { NextPage } from 'next';

/* Components */
import { PostList } from '@/components';

const NewPostsPaginatedPage: NextPage = () => {
    return <PostList isPaginated />;
};

export default NewPostsPaginatedPage;
