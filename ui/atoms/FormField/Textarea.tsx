import type { FocusEvent, TextareaHTMLAttributes } from 'react';
import type { PropsWithClasses } from "@/interfaces/global";
import type { FormField } from "@/interfaces/form";

import { memo, useRef, Children } from "react";

import Button from "@/ui/atoms/Button";

type Props<T = {}> =
    & PropsWithClasses<
        | 'label'
        | 'root'
        | 'textarea'
        | 'placeholder'
        | 'action'
        | 'placeholderHide'
    >
    & TextareaHTMLAttributes<T>
    & FormField
    & typeof defaultProps;

const defaultProps = {
    value: ''
};

const Textarea = ({
    id,
    value,
    placeholder,
    classes,
    actionSlot,
    labelSlot,
    onFocus,
    onBlur,
    ...restTextareaProps
}: Props) => {
    const placeholderRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const isTextareaEmpty = () => !(value.trim() || textAreaRef.current?.value)

    const onTexareaFocusHandler = () => {
        textAreaRef.current?.focus();
        placeholderRef.current?.classList.toggle(classes.placeholderHide!, true);
    };

    const onTextareaFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
        onTexareaFocusHandler();
        onFocus?.(event);
    };

    const onTextareaBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
        const placeholderElement = placeholderRef.current;
        if (placeholderElement && isTextareaEmpty()) {
            placeholderElement.classList.toggle(classes.placeholderHide!, false);
        }
        onBlur?.(event);
    };

    return (
        <>
            {Boolean(labelSlot) && (
                <label
                    className={classes.label}
                    onClick={onTexareaFocusHandler}
                >
                    {labelSlot}
                </label>
            )}
            <div className={classes.root}>
                <textarea
                    {...restTextareaProps}
                    ref={textAreaRef}
                    className={classes.textarea}
                    id={id}
                    value={value}
                    placeholder={actionSlot ? '' : placeholder}
                    onFocus={onTextareaFocus}
                    onBlur={onTextareaBlur}
                />
                {actionSlot && (
                    <div
                        ref={placeholderRef}
                        className={classes.placeholder}
                    >
                        {placeholder}
                        {Children.map(actionSlot, (child, index) => (
                            <Button
                                key={index}
                                type='button'
                                className={classes.action}
                                onClick={onTexareaFocusHandler}
                            >
                                {child}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

Textarea.defaultProps = defaultProps;

export default memo(Textarea);
