/* Core */
import { useForm } from 'react-hook-form';

/* Components */
import { Fieldset, Input } from '../Form';

/* Instruments */
import * as gql from '@/graphql';

// description max-length 85;

export const CreatePostForm: React.FC = () => {
    const {
        register, handleSubmit, getValues, reset, formState,
    } = useForm<gql.CreatePostMutationVariables>({
        defaultValues: {
            url:         '',
            description: '',
        },
        // mode: 'all'
    });

    const [ createPostMutation ] = gql.useCreatePostMutation({
        variables: getValues(),
        onCompleted() {
            // Router.push('/');
        },
        refetchQueries: [{ query: gql.FeedDocument }],
        // update(cache, response) {
        //     const createLink = response.data.createLink;
        //     const first = process.env.NEXT_PUBLIC_POSTS_PER_PAGE;
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
        //                 links: data,
        //                 count: data.length,
        //             },
        //         },
        //     });
        // },
    });

    const submit = () => {
        createPostMutation();
        reset();
    };

    return (
        <form onSubmit = { handleSubmit(submit) }>
            <h2 className = 'mv3'>Create post</h2>
            <Fieldset>
                <Input
                    formState = { formState }
                    placeholder = 'A description for the link'
                    register = { register('description') }
                />
                <Input
                    formState = { formState }
                    placeholder = 'The URL for the link'
                    register = { register('url') }
                />
                <button className = 'button' type = 'submit'>
                    Submit
                </button>
            </Fieldset>
        </form>
    );
};
