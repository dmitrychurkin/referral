import type { BaseProps, PropsWithClasses } from '@/interfaces/global';
import type { PropsWithChildren, MouseEvent } from 'react';

import React, { memo } from "react";
import clsx from 'clsx';

import styles from './Step.module.css';

export enum Status {
    COMPLETED,
    ACTIVE
};

type Props = PropsWithChildren<
    & BaseProps
    & PropsWithClasses<
        'root' | 'index' | 'content' | 'active' | 'completed'
    >
    & {
        readonly index: number;
        readonly status?: Status;
        readonly onClick?: (
            index: number,
            status: Status | undefined,
            event: MouseEvent<HTMLButtonElement>
        ) => void;
    }
>;

const defaultProps = {
    classes: {}
};

const Step = ({ index, status, classes, onClick, children }: Props) => {
    const getModifierClasses = (status?: Status) =>
        typeof status !== 'undefined' && [
            [styles.completed, classes.completed],
            [styles.active, classes.active]
        ][status];

    const onStepClick = (index: number) =>
        (event: MouseEvent<HTMLButtonElement>) =>
            onClick?.(index, status, event);

    return (
        <button
            type='button'
            className={clsx(
                styles.root,
                classes.root,
                getModifierClasses(status)
            )}
            onClick={onStepClick(index)}
        >
            <div
                className={clsx(
                    styles.index,
                    classes.index
                )}
            >
                {index}
            </div>
            <div
                className={clsx(
                    styles.content,
                    classes.content
                )}
            >
                {children}
            </div>
        </button>
    );
};

Step.defaultProps = defaultProps;

export default memo(Step);
