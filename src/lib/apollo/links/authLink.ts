/* Core */
import { setContext } from '@apollo/client/link/context';

const AUTH_TOKEN_NAME = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;

export const authLink = setContext((_, prevCtx) => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);

    const ctx = {
        headers: {
            ...prevCtx.headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    };

    return ctx;
});
