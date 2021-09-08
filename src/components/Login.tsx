/* Core */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/* Instruments */
import { AUTH_TOKEN } from '../constants';
import * as gql from '../graphql';

export const Login: React.FC = props => {
    const history = useHistory();

    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const _confirm = async data => {
        const { token } = login ? data.login : data.signup;

        localStorage.setItem(AUTH_TOKEN, token);

        history.push(`/`);
    };

    const [loginMutation] = gql.useLoginMutation({
        variables: {
            email,
            password,
        },
        onCompleted(data) {
            _confirm(data);
        },
    });
    const [signupMutation] = gql.useSignupMutation({
        variables: {
            email,
            password,
            name,
        },
        onCompleted(data) {
            _confirm(data);
        },
    });

    const authenticate = () => {
        login ? loginMutation() : signupMutation();
    };

    return (
        <div>
            <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
            <div className="flex flex-column">
                {!login && (
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        placeholder="Your name"
                    />
                )}
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder="Your email address"
                />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Choose a safe password"
                />
            </div>
            <div className="flex mt3">
                <div className="pointer mr2 button" onClick={authenticate}>
                    {login ? 'login' : 'create account'}
                </div>
                <div
                    className="pointer button"
                    onClick={() => setLogin(!login)}>
                    {login
                        ? 'need to create an account?'
                        : 'already have an account?'}
                </div>
            </div>
        </div>
    );
};
