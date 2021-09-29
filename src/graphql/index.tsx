import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
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
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createLink: Link;
  deleteLink: Scalars['Boolean'];
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
  updateLink: Link;
  vote?: Maybe<Vote>;
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
  link?: Maybe<Link>;
};


export type QueryFeedArgs = {
  filter: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
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
  linkCreated?: Maybe<Link>;
  linkVoted?: Maybe<Vote>;
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


export type SignupMutation = { __typename?: 'Mutation', signup?: Maybe<{ __typename?: 'AuthPayload', token?: Maybe<string> }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: Maybe<{ __typename?: 'AuthPayload', token?: Maybe<string> }> };

export type FeedQueryVariables = Exact<{
  filter: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
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


export type VoteMutation = { __typename?: 'Mutation', vote?: Maybe<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string, url: string, description: string, createdAt: string, postedBy: { __typename?: 'User', id: string, name: string }, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> }, user: { __typename?: 'User', id: string } }> };

export type LinkCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type LinkCreatedSubscription = { __typename?: 'Subscription', linkCreated?: Maybe<{ __typename?: 'Link', id: string, url: string, description: string, createdAt: string, postedBy: { __typename?: 'User', id: string, name: string }, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> }> };

export type PostVotedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PostVotedSubscription = { __typename?: 'Subscription', linkVoted?: Maybe<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string, url: string, description: string, createdAt: string, postedBy: { __typename?: 'User', id: string, name: string }, votes: Array<{ __typename?: 'Vote', id: string, user: { __typename?: 'User', id: string } }> }, user: { __typename?: 'User', id: string } }> };

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
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

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
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const FeedDocument = gql`
    query feed($filter: String!, $skip: Int!, $take: Int!) {
  feed(filter: $filter, skip: $skip, take: $take) {
    count
    links {
      ...LinkFragment
    }
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
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
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
export type CreateLinkMutationFn = Apollo.MutationFunction<CreateLinkMutation, CreateLinkMutationVariables>;

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
export function useCreateLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, options);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;
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
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

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
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
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
export function useLinkCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<LinkCreatedSubscription, LinkCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LinkCreatedSubscription, LinkCreatedSubscriptionVariables>(LinkCreatedDocument, options);
      }
export type LinkCreatedSubscriptionHookResult = ReturnType<typeof useLinkCreatedSubscription>;
export type LinkCreatedSubscriptionResult = Apollo.SubscriptionResult<LinkCreatedSubscription>;
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
export function usePostVotedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PostVotedSubscription, PostVotedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PostVotedSubscription, PostVotedSubscriptionVariables>(PostVotedDocument, options);
      }
export type PostVotedSubscriptionHookResult = ReturnType<typeof usePostVotedSubscription>;
export type PostVotedSubscriptionResult = Apollo.SubscriptionResult<PostVotedSubscription>;
export type AuthPayloadKeySpecifier = ('token' | 'user' | AuthPayloadKeySpecifier)[];
export type AuthPayloadFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FeedKeySpecifier = ('count' | 'links' | FeedKeySpecifier)[];
export type FeedFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LinkKeySpecifier = ('createdAt' | 'description' | 'id' | 'postedBy' | 'url' | 'votes' | LinkKeySpecifier)[];
export type LinkFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	postedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createLink' | 'deleteLink' | 'login' | 'signup' | 'updateLink' | 'vote' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createLink?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteLink?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	signup?: FieldPolicy<any> | FieldReadFunction<any>,
	updateLink?: FieldPolicy<any> | FieldReadFunction<any>,
	vote?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('feed' | 'link' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	feed?: FieldPolicy<any> | FieldReadFunction<any>,
	link?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('linkCreated' | 'linkVoted' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	linkCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	linkVoted?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('email' | 'id' | 'links' | 'name' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteKeySpecifier = ('id' | 'link' | 'user' | VoteKeySpecifier)[];
export type VoteFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	link?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AuthPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthPayloadKeySpecifier | (() => undefined | AuthPayloadKeySpecifier),
		fields?: AuthPayloadFieldPolicy,
	},
	Feed?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FeedKeySpecifier | (() => undefined | FeedKeySpecifier),
		fields?: FeedFieldPolicy,
	},
	Link?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LinkKeySpecifier | (() => undefined | LinkKeySpecifier),
		fields?: LinkFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	Vote?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteKeySpecifier | (() => undefined | VoteKeySpecifier),
		fields?: VoteFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;