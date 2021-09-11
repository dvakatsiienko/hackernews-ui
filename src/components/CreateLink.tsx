/* Core */
import { useState } from 'react';

/* Instruments */
import * as gql from '../graphql';

export const CreateLink: React.FC = () => {
    // const history = useHistory();
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    // const [createPostMutation] = gql.useCreatePostMutation({
    //     variables: {
    //         description,
    //         url,
    //     },
    //     onCompleted() {
    //         history.push('/new/1');
    //     },
    //     update(cache, { data: { post } }) {
    //         const first = process.env.NEXT_PUBLIC_LINKS_PER_PAGE;
    //         const skip = 0;
    //         const orderBy = 'createdAt_DESC';

    //         const oldData = cache.readQuery<gql.FeedQuery>({
    //             query: gql.FeedDocument,
    //             variables: { first, skip, orderBy },
    //         });

    //         // @ts-ignore
    //         const data: gql.FeedQuery = [post, ...oldData.feed.links];

    //         cache.writeQuery<gql.FeedQuery>({
    //             query: gql.FeedDocument,
    //             variables: { first, skip, orderBy },
    //             data: {
    //                 __typename: 'Query',
    //                 feed: {
    //                     __typename: 'Feed',
    //                     // @ts-ignore
    //                     links: data,
    //                     // @ts-ignore
    //                     count: data.length,
    //                 },
    //             },
    //         });
    //     },
    // });

    return (
        <div>
            <div className="flex flex-column mt3">
                <input
                    className="mb2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    placeholder="A description for the link"
                />
                <input
                    className="mb2"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    type="text"
                    placeholder="The URL for the link"
                />
                {/* <button onClick={() => createPostMutation()}>Submit</button> */}
            </div>
        </div>
    );
};
