/* Core */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

/* Instruments */
import * as gql from '@/graphql';

const schema: yup.SchemaOf<gql.FeedQueryVariables> = yup.object({
    filter: yup.string(),
    skip:   yup.number(),
    take:   yup.number(),
});

export const resolver = yupResolver(schema);
