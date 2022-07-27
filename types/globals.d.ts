// eslint-disable-next-line @typescript-eslint/no-var-requires
const { envConfig } = require('../env-config.mjs');

declare const __ENV: string = envConfig.__ENV__;
declare const { __DEV__ } = envConfig;
declare const { __STAGE__ } = envConfig;
declare const { __PROD__ } = envConfig;
