/* Core */
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const NewLinksPage: NextPage = () => {
    const router = useRouter();

    router.replace('/new/1');

    return null;
};

export default NewLinksPage;
