/* Core */
import { makeVar } from '@apollo/client';

export const vars = {
    isAuthenticated: makeVar<boolean>(false),
};
