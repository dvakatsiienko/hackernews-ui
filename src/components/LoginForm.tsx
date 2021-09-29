/* Core */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

/* Instruments */
import * as gql from '../graphql';

interface FormValues {
    login: boolean;
    email: string;
    password: string;
    name: string;
}

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const { register, handleSubmit, getValues } = useForm<FormValues>({
        defaultValues: {
            email:    '',
            password: '',
            name:     '',
        },
    });
    const [ isLogin, setIsLogin ] = useState(true);

    const _confirm = async data => {
        const { token } = isLogin ? data.login : data.signup;

        localStorage.setItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token);
        router.replace('/');
    };

    const [ loginMutation ] = gql.useLoginMutation({
        variables: getValues(),
        onCompleted(data) {
            _confirm(data);
        },
    });
    const [ signupMutation ] = gql.useSignupMutation({
        variables: getValues(),
        onCompleted(data) {
            _confirm(data);
        },
    });

    const submit = () => {
        isLogin ? loginMutation() : signupMutation();
    };

    return (
        <div>
            <h4 className = 'mv3'>{isLogin ? 'Login' : 'Sign Up'}</h4>

            <form onSubmit = { handleSubmit(submit) }>
                <div className = 'flex flex-column'>
                    {!isLogin && (
                        <input placeholder = 'Your name' { ...register('name') } />
                    )}
                    <input
                        placeholder = 'Your email address'
                        { ...register('email') }
                    />
                    <input
                        placeholder = 'Choose a safe password'
                        type = 'password'
                        { ...register('password') }
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
                            ? 'need to create an account?'
                            : 'already have an account?'}
                    </button>
                </div>
            </form>
        </div>
    );
};
