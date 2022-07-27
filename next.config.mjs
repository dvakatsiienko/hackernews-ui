/* Instruments */
// import { envConfig } from './env-config.mjs';

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

const { NODE_ENV } = process.env;

const envConfig = {
    __ENV__:   NODE_ENV,
    __DEV__:   NODE_ENV === 'development',
    __STAGE__: NODE_ENV === 'stage',
    __PROD__:  NODE_ENV === 'production',
    __TEST__:  NODE_ENV === 'test',
};

export const webpack = (config, { webpack }) => {
    config.plugins.push(new webpack.DefinePlugin({ ...envConfig }));

    return config;
};
