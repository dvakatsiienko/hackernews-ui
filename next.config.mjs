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
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: {
        // Enabled by default in development, disabled in production to reduce file size,
        // setting this will override the default for all environments.
        displayName: true,
        // Enabled by default.
        ssr:         true,
        // Enabled by default.
        fileName:    true,
        // Empty by default.
        //   topLevelImportPaths?: string[],
        // Defaults to ["index"].
        //   meaninglessFileNames?: string[],
        // Enabled by default.
        //   cssProp: true,
        // Empty by default.
        //   namespace?: string,
        // Not supported yet.
        //   minify?: boolean,
        // Not supported yet.
        //   transpileTemplateLiterals?: boolean,
        // Not supported yet.
        //   pure?: boolean,
    },
};
