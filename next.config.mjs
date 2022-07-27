/* Instruments */
import { envConfig } from './env-config.mjs';

export async function redirects() {
    return [
        {
            source:      '/user',
            destination: '/new/1',
            permanent:   true,
        },
        {
            source:      '/new',
            destination: '/new/1',
            permanent:   true,
        },
    ];
}

export const compiler = {
    styledComponents: {
        displayName: true,
        ssr:         true,
        fileName:    true,
    },
};

export const webpack = (config, { webpack }) => {
    config.plugins.push(new webpack.DefinePlugin({ ...envConfig }));

    return config;
};
