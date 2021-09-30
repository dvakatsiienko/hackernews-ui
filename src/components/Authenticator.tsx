/* Core */
import { useState, useEffect } from 'react';

/* Instruments */
import * as gql from '@/graphql';
import { vars } from '@/lib/apollo';

export const Authenticator: React.FC = props => {
    const [ isInitialized, setIsInitialized ] = useState(false);
    const [ authenticate ] = gql.useAuthenticateLazyQuery({
        onCompleted(res) {
            if (res.authenticate) {
                vars.isAuthenticated(true);
            }

            setIsInitialized(true);
        },
    });

    useEffect(() => {
        const token = localStorage.getItem(
            process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME,
        );

        if (token) {
            authenticate({ variables: { token: '111' } });
        } else {
            setIsInitialized(true);
        }
    }, []);

    if (!isInitialized) {
        return null;
    }

    return <>{props.children}</>;
};
