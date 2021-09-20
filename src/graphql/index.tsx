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
  linkVoted: Maybe<Vote>;
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


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', count: number, links: Array<{ __typename?: 'Link', id: string, url: string, description: string, createdAt: string, postedBy: { __typename?: 'User', id: string, name: string }, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> }> } };

export type CreateLinkMutationVariables = Exact<{
  description: Scalars['String'];
  url: Scalars['String'];
}>;


export type CreateLinkMutation = { __typename?: 'Mutation', createLink: { __typename?: 'Link', id: string, url: string, description: string, createdAt: string } };

export type VoteMutationVariables = Exact<{
  linkId: Scalars['ID'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: Maybe<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string, url: string, description: string, createdAt: string, postedBy: { __typename?: 'User', id: string, name: string }, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> }, user: { __typename?: 'User', id: string } }> };

export type LinkCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type LinkCreatedSubscription = { __typename?: 'Subscription', linkCreated: Maybe<{ __typename?: 'Link', id: string, url: string, description: string, createdAt: string, postedBy: { __typename?: 'User', id: string, name: string }, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> }> };

export type PostVotedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PostVotedSubscription = { __typename?: 'Subscription', linkVoted: Maybe<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string, url: string, description: string, createdAt: string, postedBy: { __typename?: 'User', id: string, name: string }, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> }, user: { __typename?: 'User', id: string } }> };

export type LinkFragment = { __typename?: 'Link', id: string, url: string, description: string, createdAt: string, postedBy: { __typename?: 'User', id: string, name: string }, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> };

export const LinkFragmentDoc = gql`
    fragment LinkFragment on Link {
  id
  url
  description
  createdAt
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
  feed(filter: $filter, skip: $skip, take: $take, orderBy: $orderBy) {
    links {
      ...LinkFragment
    }
    count
  }
}
    ${LinkFragmentDoc}`;

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
export const CreateLinkDocument = gql`
    mutation createLink($description: String!, $url: String!) {
  createLink(description: $description, url: $url) {
    id
    url
    description
    createdAt
  }
}
    `;
export type CreateLinkMutationFn = ApolloReactCommon.MutationFunction<CreateLinkMutation, CreateLinkMutationVariables>;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      description: // value for 'description'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, options);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = ApolloReactCommon.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;
export const VoteDocument = gql`
    mutation vote($linkId: ID!) {
  vote(linkId: $linkId) {
    id
    link {
      ...LinkFragment
    }
    user {
      id
    }
  }
}
    ${LinkFragmentDoc}`;
export type VoteMutationFn = ApolloReactCommon.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = ApolloReactCommon.MutationResult<VoteMutation>;
export type VoteMutationOptions = ApolloReactCommon.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const LinkCreatedDocument = gql`
    subscription linkCreated {
  linkCreated {
    ...LinkFragment
  }
}
    ${LinkFragmentDoc}`;

/**
 * __useLinkCreatedSubscription__
 *
 * To run a query within a React component, call `useLinkCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLinkCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinkCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useLinkCreatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<LinkCreatedSubscription, LinkCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<LinkCreatedSubscription, LinkCreatedSubscriptionVariables>(LinkCreatedDocument, options);
      }
export type LinkCreatedSubscriptionHookResult = ReturnType<typeof useLinkCreatedSubscription>;
export type LinkCreatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<LinkCreatedSubscription>;
export const PostVotedDocument = gql`
    subscription postVoted {
  linkVoted {
    id
    link {
      ...LinkFragment
    }
    user {
      id
    }
  }
}
    ${LinkFragmentDoc}`;

/**
 * __usePostVotedSubscription__
 *
 * To run a query within a React component, call `usePostVotedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostVotedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostVotedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePostVotedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<PostVotedSubscription, PostVotedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<PostVotedSubscription, PostVotedSubscriptionVariables>(PostVotedDocument, options);
      }
export type PostVotedSubscriptionHookResult = ReturnType<typeof usePostVotedSubscription>;
export type PostVotedSubscriptionResult = ApolloReactCommon.SubscriptionResult<PostVotedSubscription>;