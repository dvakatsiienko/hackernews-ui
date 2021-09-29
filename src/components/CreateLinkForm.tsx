/* Core */
import { useForm } from 'react-hook-form';

/* Instruments */
import * as gql from '../graphql';

export const CreateLinkForm: React.FC = () => {
    const {
        register, handleSubmit, getValues, reset,
    } = useForm<gql.CreateLinkMutationVariables>({
        defaultValues: {
            url:         '',
            description: '',
        },
        // mode: 'all'
    });

    const [ createLinkMutation ] = gql.useCreateLinkMutation({
        variables: getValues(),
        onCompleted() {
            // Router.push('/');
        },
        refetchQueries: [{ query: gql.FeedDocument }],
        // update(cache, response) {
        //     const createLink = response.data.createLink;
        //     const first = process.env.NEXT_PUBLIC_LINKS_PER_PAGE;
        //     const skip = 0;

        //     const oldData = cache.readQuery<gql.FeedQuery>({
        //         query: gql.FeedDocument,
        //         variables: { first, skip },
        //     });

        //     const data = [createLink, ...oldData.feed.links];

        //     cache.writeQuery<gql.FeedQuery>({
        //         query: gql.FeedDocument,
        //         variables: { first, ski },
        //         data: {
        //             __typename: 'Query',
        //             feed: {
        //                 __typename: 'Feed',
        //                 // @ts-ignore
        //                 links: data,
        //                 // @ts-ignore
        //                 count: data.length,
        //             },
        //         },
        //     });
        // },
    });

    const submit = () => {
        createLinkMutation();
        reset();
    };

    return (
        <div>
            <form onSubmit = { handleSubmit(submit) }>
                <div className = 'flex flex-column mt3'>
                    <input
                        className = 'mb2'
                        placeholder = 'A description for the link'
                        { ...register('description') }
                    />
                    <input
                        className = 'mb2'
                        placeholder = 'The URL for the link'
                        { ...register('url') }
                    />
                    <button type = 'submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};
