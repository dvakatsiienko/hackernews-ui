/* Core */
import type {
    UseFormRegisterReturn,
    FormState,
    FieldValues
} from 'react-hook-form';
import styled from 'styled-components';

export const Input: React.FC<InputProps> = props => {
    return (
        <>
            <StyedInput
                placeholder = { props.placeholder }
                type = { props.type }
                { ...props.register }
            />

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
const StyedInput = styled.input<React.InputHTMLAttributes<Element>>`
    padding: 6px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid grey;

    &:not(:last-child) {
        margin-bottom: 3px;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;
const ErrorMessage = styled.span`
    color: red;
    font-weight: 500;
    font-size: 14px;

    &:not(:last-child) {
        margin-bottom: 9px;
    }
`;

/* Types */
interface InputProps {
    register: UseFormRegisterReturn;
    formState: FormState<FieldValues>;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
}
