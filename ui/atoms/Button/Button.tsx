import type { ButtonHTMLAttributes, ForwardRefRenderFunction, ReactElement } from 'react';

import { memo, forwardRef } from "react";
import clsx from 'clsx';

import styles from './Button.module.css';

export type Props<T = {}> =
    & ButtonHTMLAttributes<T>
    & Partial<Record<'w100', boolean>>
    & {
        readonly variant?: Variants;
        readonly startIcon?: ReactElement;
        readonly endIcon?: ReactElement;
    };

export enum Variants {
    OUTLINED = 'outlined',
    CONTAINED = 'contained',
    ROUNDED = 'rounded'
};

const Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = ({
    className,
    variant = Variants.OUTLINED,
    disabled,
    w100,
    children,
    startIcon,
    endIcon,
    ...restAttrs
}, ref) => (
    <button
        ref={ref}
        className={clsx(
            styles.root,
            styles[variant],
            !!w100 && styles.w100,
            !!disabled && styles.disabled,
            className
        )}
        {...restAttrs}
        disabled={disabled}
    >
        {startIcon}
        {children}
        {endIcon}
    </button>
);

export default memo(forwardRef(Button));
