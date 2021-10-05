/* Core */
import { NextPage } from 'next';

/* Components */
import { PostList } from '@/components';

const NewPostsPaginatedPage: NextPage = () => {
    return <PostList isPaginated isSubscribed />;
};

export default NewPostsPaginatedPage;
