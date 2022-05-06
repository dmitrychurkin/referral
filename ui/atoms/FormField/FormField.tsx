import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import type { FormField as FormFieldType } from "@/interfaces/form";
import type { PropsWithClasses } from "@/interfaces/global";

import clsx from "clsx";
import { memo } from "react";

import Textarea from "./Textarea";
import Textfield from "./Textfield";
import Filefield from './Filefield';

import styles from './FormField.module.css';


type Props<T = {}> =
    & PropsWithClasses<'root' | 'label' | 'input' | 'helperText' | 'helperTextHighlight'>
    & (InputHTMLAttributes<T> | TextareaHTMLAttributes<T>)
    &  FormFieldType
    & typeof defaultProps;

const defaultProps = {
    classes: {},
    type: 'text'
};

const FormField = ({
    className,
    classes,
    type,
    value,
    isValid,
    helperTextSlot,
    ...restFormFieldProps
}: Props) => {
    const label = clsx(
        styles.label,
        classes.label
    );

    const isInvalid = () =>
        (typeof isValid === 'boolean') && !isValid;

    const ActionableComponent = {
        textarea: Textarea,
        file: Filefield
    }[type as 'textarea' | 'file'];

    return (
        <div
            className={clsx(
                styles.root,
                classes.root,
                className
            )}
        >
            {ActionableComponent
                ? (
                    <ActionableComponent
                        {...restFormFieldProps}
                        type={type}
                        classes={{
                            root: styles.textareaWrapper,
                            label,
                            textarea: clsx(
                                restFormFieldProps.actionSlot
                                    ? styles.textarea
                                    : styles.textareaClassic,
                                classes.input,
                            ),
                            placeholder: styles.placeholder,
                            action: styles.action,
                            placeholderHide: styles.placeholderHide
                        }}
                        value={value as string}
                    />
                )
                : (
                    <Textfield
                        {...restFormFieldProps}
                        classes={{
                            label,
                            input: clsx(
                                styles.input,
                                classes.input
                            )
                        }}
                        type={type}
                        value={value}
                    />
                )}
            <div
                className={clsx(
                    styles.helperText,
                    classes.helperText,
                    isInvalid() && [
                        styles.helperTextHighlight,
                        classes.helperTextHighlight
                    ]
                )}
            >
                &nbsp;{helperTextSlot}
            </div>
        </div>
    );
};

FormField.defaultProps = defaultProps;

export default memo(FormField);
