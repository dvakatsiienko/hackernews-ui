/* Core */
import { WebSocketLink } from '@apollo/client/link/ws';

const AUTH_TOKEN_NAME = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;
const GQL_WS_URL = process.env.NEXT_PUBLIC_GQL_WS_URL;

export const createWSLink = () => {
    const wsLink = new WebSocketLink({
        uri: GQL_WS_URL,
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN_NAME),
        },
    });

    return wsLink;
};
