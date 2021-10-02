/* Core */
import { useRouter } from 'next/router';

/* Instruments */
import * as gql from '@/graphql';

const POSTS_PER_PAGE = Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE);

export const useFeedVariables = (): UseFeedVariables => {
    const router = useRouter();

    const isPaginated = router.pathname.includes('new');
    const page = parseInt(router.query.page as string);

    const skip = isPaginated ? (page - 1) * POSTS_PER_PAGE : 0;
    const take = isPaginated ? POSTS_PER_PAGE : POSTS_PER_PAGE;

    return {
        isPaginated,
        page,
        variables: {
            skip,
            take,
        },
    };
};

/* Types */
interface UseFeedVariables {
    isPaginated: boolean;
    page: number;
    variables: gql.FeedQueryVariables;
}
