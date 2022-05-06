import type { PropsWithChildren, ReactElement, FormHTMLAttributes } from 'react';
import type { PropsWithClasses } from '@/interfaces/global';

import { memo } from "react";
import clsx from 'clsx';

import styles from './Form.module.css';

type Props<T = HTMLFormElement> =
    & PropsWithChildren<FormHTMLAttributes<T>>
    & PropsWithClasses<'root' | 'title' | 'action'>
    & {
        readonly titleSlot?: ReactElement;
        readonly actionSlot: ReactElement;
    };

const defaultProps = {
    classes: {}
};

const Register = ({ className, classes, onSubmit, titleSlot, children, actionSlot }: Props) => (
    <form
        className={clsx(
            classes.root,
            className
        )}
        onSubmit={onSubmit}
    >
        {Boolean(titleSlot) && (
            <div
                className={clsx(
                    styles.title,
                    classes.title
                )}
            >
                {titleSlot}
            </div>
        )}
        {children}
        <div
            className={clsx(
                styles.action,
                classes.action
            )}
        >
            {actionSlot}
        </div>
    </form>
);

Register.defaultProps = defaultProps;

export default memo(Register);
