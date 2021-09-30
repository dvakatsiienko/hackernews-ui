/* Core */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const createResolver = (isLogin: boolean) => {
    const schema: yup.SchemaOf<FormShape> = yup
        .object()
        .shape({
            name:  !isLogin && yup.string().min(4, 'Minimum ${min} characters'),
            email: yup
                .string()
                .email('Should be a valid email.')
                .required('Required.'),
            password: yup
                .string()
                .min(4, 'Minimum ${min} characters.')
                .required('Required.'),
        })
        .required();

    const resolver = yupResolver(schema);

    return resolver;
};

/* Types */
interface FormShape {
    email: string;
    password: string;
    name: string;
}
