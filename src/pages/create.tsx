/* Core */
import { NextPage } from 'next';

/* Components */
import { LinkList, CreateLinkForm } from '@/components';

const CreatePage: NextPage = () => {
    return (
        <>
            <CreateLinkForm />

            <LinkList />
        </>
    );
};

export default CreatePage;
