import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  info: Scalars['String'];
  feed: Feed;
};


export type QueryFeedArgs = {
  filter: Maybe<Scalars['String']>;
  skip: Maybe<Scalars['Int']>;
  first: Maybe<Scalars['Int']>;
  orderBy: Maybe<LinkOrderByInput>;
};

export enum LinkOrderByInput {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC'
}

export type Feed = {
  __typename?: 'Feed';
  links: Array<Link>;
  count: Scalars['Int'];
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  url: Scalars['String'];
  postedBy: Maybe<User>;
  votes: Array<Vote>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  links: Array<Link>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  link: Link;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  post: Link;
  signup: Maybe<AuthPayload>;
  login: Maybe<AuthPayload>;
  vote: Vote;
};


export type MutationPostArgs = {
  url: Scalars['String'];
  description: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVoteArgs = {
  linkId: Scalars['ID'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Maybe<Scalars['String']>;
  user: Maybe<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newLink: Maybe<Link>;
  newVote: Maybe<Vote>;
};

export type SignupMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  )> }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  )> }
);

export type FeedQueryVariables = {
  first: Maybe<Scalars['Int']>;
  skip: Maybe<Scalars['Int']>;
  orderBy: Maybe<LinkOrderByInput>;
};


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed: (
    { __typename?: 'Feed' }
    & Pick<Feed, 'count'>
    & { links: Array<(
      { __typename?: 'Link' }
      & Pick<Link, 'id' | 'createdAt' | 'url' | 'description'>
      & { postedBy: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      )>, votes: Array<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'id'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'id'>
        ) }
      )> }
    )> }
  ) }
);

export type FeedSearchQueryVariables = {
  filter: Scalars['String'];
};


export type FeedSearchQuery = (
  { __typename?: 'Query' }
  & { feed: (
    { __typename?: 'Feed' }
    & { links: Array<(
      { __typename?: 'Link' }
      & Pick<Link, 'id' | 'url' | 'description' | 'createdAt'>
      & { postedBy: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      )>, votes: Array<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'id'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'id'>
        ) }
      )> }
    )> }
  ) }
);

export type CreatePostMutationVariables = {
  description: Scalars['String'];
  url: Scalars['String'];
};


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { post: (
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'createdAt' | 'url' | 'description'>
  ) }
);

export type NewLinksSubscriptionSubscriptionVariables = {};


export type NewLinksSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { newLink: Maybe<(
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'url' | 'description' | 'createdAt'>
    & { postedBy: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )>, votes: Array<(
      { __typename?: 'Vote' }
      & Pick<Vote, 'id'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ) }
    )> }
  )> }
);

export type NewVotesSubscriptionSubscriptionVariables = {};


export type NewVotesSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { newVote: Maybe<(
    { __typename?: 'Vote' }
    & Pick<Vote, 'id'>
    & { link: (
      { __typename?: 'Link' }
      & Pick<Link, 'id' | 'url' | 'description' | 'createdAt'>
      & { postedBy: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      )>, votes: Array<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'id'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'id'>
        ) }
      )> }
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  )> }
);


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
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
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
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const FeedDocument = gql`
    query feed($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
  feed(first: $first, skip: $skip, orderBy: $orderBy) @connection(key: "feed") {
    links {
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
    count
  }
}
    `;

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
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFeedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        return ApolloReactHooks.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions);
      }
export function useFeedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = ApolloReactCommon.QueryResult<FeedQuery, FeedQueryVariables>;
export const FeedSearchDocument = gql`
    query feedSearch($filter: String!) {
  feed(filter: $filter) {
    links {
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
  }
}
    `;

/**
 * __useFeedSearchQuery__
 *
 * To run a query within a React component, call `useFeedSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedSearchQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFeedSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeedSearchQuery, FeedSearchQueryVariables>) {
        return ApolloReactHooks.useQuery<FeedSearchQuery, FeedSearchQueryVariables>(FeedSearchDocument, baseOptions);
      }
export function useFeedSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeedSearchQuery, FeedSearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FeedSearchQuery, FeedSearchQueryVariables>(FeedSearchDocument, baseOptions);
        }
export type FeedSearchQueryHookResult = ReturnType<typeof useFeedSearchQuery>;
export type FeedSearchLazyQueryHookResult = ReturnType<typeof useFeedSearchLazyQuery>;
export type FeedSearchQueryResult = ApolloReactCommon.QueryResult<FeedSearchQuery, FeedSearchQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($description: String!, $url: String!) {
  post(description: $description, url: $url) {
    id
    createdAt
    url
    description
  }
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      description: // value for 'description'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const NewLinksSubscriptionDocument = gql`
    subscription newLinksSubscription {
  newLink {
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
}
    `;

/**
 * __useNewLinksSubscriptionSubscription__
 *
 * To run a query within a React component, call `useNewLinksSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewLinksSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewLinksSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewLinksSubscriptionSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewLinksSubscriptionSubscription, NewLinksSubscriptionSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewLinksSubscriptionSubscription, NewLinksSubscriptionSubscriptionVariables>(NewLinksSubscriptionDocument, baseOptions);
      }
export type NewLinksSubscriptionSubscriptionHookResult = ReturnType<typeof useNewLinksSubscriptionSubscription>;
export type NewLinksSubscriptionSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewLinksSubscriptionSubscription>;
export const NewVotesSubscriptionDocument = gql`
    subscription newVotesSubscription {
  newVote {
    id
    link {
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
    user {
      id
    }
  }
}
    `;

/**
 * __useNewVotesSubscriptionSubscription__
 *
 * To run a query within a React component, call `useNewVotesSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewVotesSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewVotesSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewVotesSubscriptionSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewVotesSubscriptionSubscription, NewVotesSubscriptionSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewVotesSubscriptionSubscription, NewVotesSubscriptionSubscriptionVariables>(NewVotesSubscriptionDocument, baseOptions);
      }
export type NewVotesSubscriptionSubscriptionHookResult = ReturnType<typeof useNewVotesSubscriptionSubscription>;
export type NewVotesSubscriptionSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewVotesSubscriptionSubscription>;