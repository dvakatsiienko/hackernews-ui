/* Core */
import type {
    UseFormRegisterReturn,
    FormState,
    FieldValues
} from 'react-hook-form';
import { Input as GeistInput, Dot } from '@geist-ui/react';
import type {
    InputProps as GeistInputProps,
    InputPasswordProps
} from '@geist-ui/react';
import styled, { css } from 'styled-components';

export const Input: React.FC<InputProps> = props => {
    const isInvalid = props.formState.errors[ props.register.name ]?.message;

    props.formState.isSubmitting;

    let dotType = 'default';
    isInvalid && (dotType = 'error');
    props.formState.isSubmitting && (dotType = 'warning');

    const InputComponent = props.type === 'password' ? (
        <StyledPInput
            htmlType = { props.type }
            // @ts-ignore
            label = { <Dot type = { dotType } /> }
            placeholder = { props.placeholder }
            type = { isInvalid ? 'error' : 'default' }
            width = '100%'
            { ...props.register }
        />
    ) : (
        <StyledInput
            htmlType = { props.type }
            // @ts-ignore
            label = { <Dot type = { dotType } /> }
            placeholder = { props.placeholder }
            type = { isInvalid ? 'error' : 'default' }
            width = '100%'
            { ...props.register }
        />
    );

    return (
        <>
            {InputComponent}
            <ErrorMessage>
                {props.formState.errors[ props.register.name ]?.message ?? (
                    <>&nbsp;</>
                )}
            </ErrorMessage>
        </>
    );
};
Input.defaultProps = {
    type: 'text',
};

/* Styles */
const style = css`
    &:not(:last-child) {
        margin-bottom: 3px;
    }

    & input {
        &:disabled {
            cursor: not-allowed;
            color: grey;
        }
    }
`;
const StyledInput = styled(GeistInput)<GeistInputProps>`
    ${style}
`;
const StyledPInput = styled(GeistInput.Password)<InputPasswordProps>`
    ${style}
`;

const ErrorMessage = styled.span`
    color: red;
    font-weight: 500;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 10px;

    & span {
        text-transform: initial !important;
    }
`;

/* Types */
interface InputProps {
    register: UseFormRegisterReturn;
    formState: FormState<FieldValues>;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
}
