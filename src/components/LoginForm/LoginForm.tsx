/* Core */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import waait from 'waait';

/* Components */
import { Fieldset, Input } from '../Form';

/* Instruments */
import { createResolver } from './resolver';
import * as gql from '@/graphql';
import { vars } from '@/lib/apollo';

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const [ isLogin, setIsLogin ] = useState(true);
    const [ isFetching, setIsFetching ] = useState(false);

    const {
        register, handleSubmit, getValues, formState,
    } = useForm({
        resolver:      createResolver(isLogin),
        mode:          'all',
        defaultValues: {
            name:     '',
            email:    'test@email.com',
            password: '12345',
        },
    });

    const saveToken = async (data: gql.AuthPayloadFragment) => {
        const { token } = data;

        localStorage.setItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token);
        router.replace('/');
        vars.isAuthenticated(true);
    };

    const [ loginMutation ] = gql.useLoginMutation({
        variables: getValues(),
        onCompleted(data) {
            saveToken(data.login);
        },
    });
    const [ signupMutation ] = gql.useSignupMutation({
        variables: getValues(),
        onCompleted(data) {
            saveToken(data.signup);
        },
    });

    const submit = async () => {
        setIsFetching(true);
        await waait(1000);
        isLogin ? await loginMutation() : await signupMutation();
        setIsFetching(false);
    };

    return (
        <form onSubmit = { handleSubmit(submit) }>
            <h2 className = 'mv3'>{isLogin ? 'Login' : 'Sign Up'}</h2>

            <Fieldset disabled = { isFetching }>
                <div className = 'flex flex-column'>
                    {!isLogin && (
                        <Input
                            formState = { formState }
                            placeholder = 'Your name'
                            register = { register('name') }
                        />
                    )}

                    <Input
                        formState = { formState }
                        placeholder = 'Your email address'
                        register = { register('email') }
                    />
                    <Input
                        formState = { formState }
                        placeholder = 'Choose a safe password'
                        register = { register('password') }
                        type = 'password'
                    />
                </div>
                <div className = 'flex mt3'>
                    <button className = 'pointer mr2 button' type = 'submit'>
                        {isLogin ? 'login' : 'create account'}
                    </button>

                    <button
                        className = 'pointer button'
                        type = 'button'
                        onClick = { () => setIsLogin(!isLogin) }
                    >
                        {isLogin
                            ? 'create account'
                            : 'already have an account?'}
                    </button>
                </div>
            </Fieldset>
        </form>
    );
};
