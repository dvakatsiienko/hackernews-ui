import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Maybe<Scalars['String']>;
  user: Maybe<User>;
};

export type Feed = {
  __typename?: 'Feed';
  count: Scalars['Int'];
  links: Array<Link>;
};

export type Link = {
  __typename?: 'Link';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  postedBy: User;
  url: Scalars['String'];
  votes: Array<Vote>;
};

export type LinkOrderByInput = {
  createdAt: Maybe<Sort>;
  description: Maybe<Sort>;
  url: Maybe<Sort>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink: Link;
  deleteLink: Scalars['Boolean'];
  login: Maybe<AuthPayload>;
  signup: Maybe<AuthPayload>;
  updateLink: Link;
  vote: Maybe<Vote>;
};


export type MutationCreateLinkArgs = {
  description: Scalars['String'];
  url: Scalars['String'];
};


export type MutationDeleteLinkArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateLinkArgs = {
  description: Scalars['String'];
  id: Scalars['ID'];
  url: Scalars['String'];
};


export type MutationVoteArgs = {
  linkId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  feed: Feed;
  link: Maybe<Link>;
};


export type QueryFeedArgs = {
  filter: Maybe<Scalars['String']>;
  orderBy: Maybe<LinkOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  take: Maybe<Scalars['Int']>;
};


export type QueryLinkArgs = {
  id: Scalars['ID'];
};

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type Subscription = {
  __typename?: 'Subscription';
  linkCreated: Maybe<Link>;
  postVoted: Maybe<Vote>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  links: Array<Link>;
  name: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  link: Link;
  user: User;
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: Maybe<{ __typename?: 'AuthPayload', token: Maybe<string> }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: Maybe<{ __typename?: 'AuthPayload', token: Maybe<string> }> };

export type FeedQueryVariables = Exact<{
  filter: Maybe<Scalars['String']>;
  skip: Maybe<Scalars['Int']>;
  take: Maybe<Scalars['Int']>;
  orderBy: Maybe<LinkOrderByInput>;
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', count: number, links: Array<{ __typename?: 'Link', id: string, createdAt: string, url: string, description: string, postedBy: { __typename?: 'User', id: string, name: string }, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> }> } };

export type VoteMutationMutationVariables = Exact<{
  linkId: Scalars['ID'];
}>;


export type VoteMutationMutation = { __typename?: 'Mutation', vote: Maybe<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> }, user: { __typename?: 'User', id: string } }> };

export type LinkFragmentFragment = { __typename?: 'Link', id: string, createdAt: string, url: string, description: string, postedBy: { __typename?: 'User', id: string, name: string }, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> };

export const LinkFragmentFragmentDoc = gql`
    fragment LinkFragment on Link {
  id
  createdAt
  url
  description
  postedBy {
    id
    name
  }
  votes {
    id
    user {
      id
    }
  }
}
    `;
export const SignupDocument = gql`
    mutation signup($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
  }
}
    `;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const FeedDocument = gql`
    query feed($filter: String, $skip: Int, $take: Int, $orderBy: LinkOrderByInput) {
  feed(filter: $filter, skip: $skip, take: $take, orderBy: $orderBy) @connection(key: "feed") {
    links {
      ...LinkFragment
    }
    count
  }
}
    ${LinkFragmentFragmentDoc}`;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFeedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = ApolloReactCommon.QueryResult<FeedQuery, FeedQueryVariables>;
export const VoteMutationDocument = gql`
    mutation VoteMutation($linkId: ID!) {
  vote(linkId: $linkId) {
    id
    link {
      id
      votes {
        id
        user {
          id
        }
      }
    }
    user {
      id
    }
  }
}
    `;
export type VoteMutationMutationFn = ApolloReactCommon.MutationFunction<VoteMutationMutation, VoteMutationMutationVariables>;

/**
 * __useVoteMutationMutation__
 *
 * To run a mutation, you first call `useVoteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutationMutation, { data, loading, error }] = useVoteMutationMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useVoteMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VoteMutationMutation, VoteMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VoteMutationMutation, VoteMutationMutationVariables>(VoteMutationDocument, options);
      }
export type VoteMutationMutationHookResult = ReturnType<typeof useVoteMutationMutation>;
export type VoteMutationMutationResult = ApolloReactCommon.MutationResult<VoteMutationMutation>;
export type VoteMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<VoteMutationMutation, VoteMutationMutationVariables>;