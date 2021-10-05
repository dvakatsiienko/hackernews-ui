/* Core */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import waait from 'waait';
import * as GUI from '@geist-ui/react';

/* Components */
import { Fieldset, Input } from '../Form';

/* Instruments */
import * as gql from '@/graphql';
import { vars } from '@/lib/apollo';
import { saveJwtToken } from '@/utils';
import { useToasts } from '@/hooks';
import { createResolver, FormShape } from './resolver';

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const isAuthenticated = vars.useIsAuthenticated();
    const [ isLogin, setIsLogin ] = useState(true);
    const [ isFetching, setIsFetching ] = useState(false);

    const createToast = useToasts();

    const form = useForm({
        resolver:      createResolver(isLogin),
        mode:          'all',
        defaultValues: {
            name:            '',
            email:           __DEV__ ? 'test@email.io' : '',
            password:        __DEV__ ? '12345' : '',
            confirmPassword: __DEV__ ? '12345' : '',
        },
    });

    const saveToken = async (data: gql.AuthPayloadFragment) => {
        const { token } = data;

        saveJwtToken(token);
        router.replace('/new/1');
        vars.isAuthenticated(true);
    };

    const [ loginMutation ] = gql.useLoginMutation({
        variables: form.getValues(),
        onCompleted(data) {
            saveToken(data.login);
        },
        onError(error) {
            form.setError('email', { message: error.message });
            form.setError('password', { message: error.message });

            createToast({ type: 'error', text: error.message, delay: 10000 });
        },
    });
    const [ signupMutation ] = gql.useSignupMutation({
        variables: form.getValues(),
        onCompleted(data) {
            saveToken(data.signup);
        },
        onError(error) {
            const fields: Array<keyof FormShape> = [
                'name',
                'email',
                'password',
                'confirmPassword',
            ];

            fields.forEach(field => {
                form.setError(field, { message: error.message });
            });

            createToast({ type: 'error', text: error.message, delay: 10000 });
        },
    });

    const submit = async () => {
        setIsFetching(true);
        await waait(1000);
        try {
            isLogin ? await loginMutation() : await signupMutation();
        } finally {
            setIsFetching(false);
        }
    };

    if (isAuthenticated) {
        isAuthenticated && router.replace('/new/1');

        return null;
    }

    return (
        <form onSubmit = { form.handleSubmit(submit) }>
            <GUI.Spacer />
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <GUI.Spacer h = { 2 } />

            <Fieldset css = 'max-width: 300px;' disabled = { isFetching }>
                {!isLogin && (
                    <Input
                        autoFocus
                        formState = { form.formState }
                        placeholder = 'Your name'
                        register = { form.register('name') }
                    />
                )}

                <Input
                    autoFocus
                    formState = { form.formState }
                    placeholder = 'Your email address'
                    register = { form.register('email') }
                />
                <Input
                    formState = { form.formState }
                    placeholder = 'Choose a safe password'
                    register = { form.register('password') }
                    type = 'password'
                />
                {!isLogin && (
                    <Input
                        formState = { form.formState }
                        placeholder = 'Confirm password'
                        register = { form.register('confirmPassword') }
                        type = 'password'
                    />
                )}

                <GUI.Spacer h = { 2 } />

                <GUI.Grid.Container gap = { 1 }>
                    <GUI.Grid>
                        <GUI.Button
                            auto
                            disabled = { isFetching }
                            htmlType = 'submit'
                            loading = { isFetching }
                        >
                            {isLogin ? 'login' : 'create account'}
                        </GUI.Button>
                    </GUI.Grid>

                    <GUI.Grid>
                        <GUI.Button
                            auto
                            ghost
                            disabled = { isFetching }
                            type = 'secondary'
                            onClick = { () => setIsLogin(!isLogin) }
                        >
                            {isLogin ? 'create account' : 'back to login'}
                        </GUI.Button>
                    </GUI.Grid>
                </GUI.Grid.Container>
            </Fieldset>
        </form>
    );
};
