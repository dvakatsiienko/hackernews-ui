/* Core */
import { useRouter } from 'next/router';

/* Instruments */
import * as gql from '@/graphql';

// const POSTS_PER_PAGE = Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE);
const POSTS_PER_PAGE = 5;

export const useFeedVariables: UseFeedVariables = options => {
    const router = useRouter();

    const page = parseInt(router.query.page as string);

    const skip = options.isPaginated ? (page - 1) * POSTS_PER_PAGE : 0;
    const take = options.isPaginated ? POSTS_PER_PAGE : 25;

    return {
        POSTS_PER_PAGE,
        page,
        variables: {
            skip,
            take,
        },
    };
};

/* Types */
interface UseFeedVariablesOptions {
    isPaginated: boolean;
}

interface UseFeedVariablesReturn {
    POSTS_PER_PAGE: number;
    page: number;
    variables: gql.FeedQueryVariables;
}

type UseFeedVariables = (
    options: UseFeedVariablesOptions,
) => UseFeedVariablesReturn;
