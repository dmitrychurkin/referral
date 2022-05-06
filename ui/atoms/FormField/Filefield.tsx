import type { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react';
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
    & InputHTMLAttributes<T>
    & FormField;

const Filefield = ({
    id,
    value,
    placeholder,
    classes,
    actionSlot,
    labelSlot,
    onChange,
    ...restProps
}: Props) => {
    const placeholderRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isInputEmpty = () =>
        !(inputRef.current?.files?.length);

    const getFile = () =>
        inputRef.current?.files?.[0];

    const handleInputClick = () => {
        inputRef.current?.click();
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { current } = placeholderRef;
        if (current) {
            current.classList.toggle(classes.placeholderHide!, !isInputEmpty());
        }
        onChange?.(event);
    };

    return (
        <>
            {Boolean(labelSlot) && (
                <label
                    className={classes.label}
                    htmlFor={id}
                >
                    {labelSlot}
                </label>
            )}
            <div className={classes.root}>
                <div
                    className={classes.textarea}
                    onClick={handleInputClick}
                >
                    {getFile()?.name}
                    <input
                        {...restProps}
                        ref={inputRef}
                        id={id}
                        value={value}
                        onChange={onChangeHandler}
                    />
                </div>
                {Boolean(actionSlot) && (
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
                                onClick={handleInputClick}
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

export default memo(Filefield);
