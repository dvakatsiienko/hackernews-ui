/* Core */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import waait from 'waait';
import {
    Text, Grid, Spacer, Button, useToasts, Toast
} from '@geist-ui/react';

/* Components */
import { Fieldset, Input } from '../Form';

/* Instruments */
import * as gql from '@/graphql';
import { vars } from '@/lib/apollo';
import { saveJwtToken } from '@/utils';
import { createResolver, FormShape } from './resolver';

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const isAuthenticated = vars.useIsAuthenticated();
    const [ isLogin, setIsLogin ] = useState(true);
    const [ isFetching, setIsFetching ] = useState(false);

    const [ , setToast ] = useToasts();
    const createToast = (toast?: Toast) => setToast({
        text: toast?.text ?? 'Error...',
        type: toast?.type ?? 'default',
    });

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
            <Text h1>{isLogin ? 'Login' : 'Sign Up'}</Text>
            <Spacer h = { 2 } />

            <Fieldset css = 'max-width: 300px;' disabled = { isFetching }>
                <div className = 'flex flex-column'>
                    {!isLogin && (
                        <Input
                            formState = { form.formState }
                            placeholder = 'Your name'
                            register = { form.register('name') }
                        />
                    )}

                    <Input
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
                    {/* <Grid.Container gap = { 3 }>
                    <Grid> */}
                    <Spacer h = { 2 } />

                    <Grid.Container gap = { 1 }>
                        <Grid>
                            <Button
                                auto
                                disabled = { isFetching }
                                htmlType = 'submit'
                                loading = { isFetching }
                                // scale = { scale }
                            >
                                {isLogin ? 'login' : 'create account'}
                            </Button>
                        </Grid>
                        {/* <Spacer /> */}

                        <Grid>
                            <Button
                                auto
                                ghost
                                // scale = { scale }
                                disabled = { isFetching }
                                type = 'secondary'
                                onClick = { () => setIsLogin(!isLogin) }
                            >
                                {isLogin ? 'create account' : 'back to login'}
                            </Button>
                        </Grid>
                    </Grid.Container>
                </div>
                {/* </Grid.Container> */}
            </Fieldset>
        </form>
    );
};
