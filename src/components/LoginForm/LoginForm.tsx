/* Core */
import { useState, useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import waait from 'waait';
import {
    Text, Grid, Spacer, Button
} from '@geist-ui/react';

/* Components */
import { Fieldset, Input } from '../Form';

/* Instruments */
import { createResolver } from './resolver';
import * as gql from '@/graphql';
import { vars } from '@/lib/apollo';

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const isAuthenticated = useReactiveVar(vars.isAuthenticated);
    const [ isLogin, setIsLogin ] = useState(true);
    const [ isFetching, setIsFetching ] = useState(false);

    const {
        register, handleSubmit, getValues, formState,
    } = useForm({
        resolver:      createResolver(isLogin),
        mode:          'all',
        defaultValues: {
            name:     '',
            email:    'test@email.io',
            password: '12345',
        },
    });

    const saveToken = async (data: gql.AuthPayloadFragment) => {
        const { token } = data;

        localStorage.setItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token);
        router.replace('/new/1');
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
        <form onSubmit = { handleSubmit(submit) }>
            <Text h1>{isLogin ? 'Login' : 'Sign Up'}</Text>
            <Spacer h = { 2 } />

            <Fieldset css = 'max-width: 300px;' disabled = { isFetching }>
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
