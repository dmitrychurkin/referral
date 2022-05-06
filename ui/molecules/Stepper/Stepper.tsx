import type { BaseProps } from '@/interfaces/global';
import type { PropsWithChildren, ReactNode, MouseEvent } from 'react';

import { memo, Children } from "react";
import clsx from 'clsx';

import Chevron from '@/ui/icons/Chevron';
import Step, { Status } from '@/ui/atoms/Step';

import styles from './Stepper.module.css';

type Props = PropsWithChildren<
    & BaseProps
    & {
        readonly activeIndex?: number;
        readonly separatorSlot?: ReactNode;
        readonly onChange?: (
            index: number,
            status: Status | undefined,
            event: MouseEvent<HTMLButtonElement>
        ) => void;
        readonly displayIndexFrom?: 0 | 1
    }
    & typeof defaultProps
>;

const defaultProps = {
    activeIndex: 0,
    separatorSlot: (
        <Chevron />
    ),
    displayIndexFrom: 1
};

const Stepper = ({
    className,
    separatorSlot,
    onChange,
    activeIndex,
    displayIndexFrom,
    children
}: Props) => {
    const separatorCollection = getSeparators(children, separatorSlot);
    const onStepClick = (
        index: number,
        ...args: [Status | undefined, MouseEvent<HTMLButtonElement>]
    ) => {
        onChange?.(index - displayIndexFrom, ...args);
    };

    return (
        <div className={clsx(styles.root, className)}>
            {Children.map(children, (content, index) => (
                <>
                    <Step
                        index={index + displayIndexFrom}
                        status={getChildStatus(index, activeIndex)}
                        onClick={onStepClick}
                    >
                        {content}
                    </Step>
                    {separatorCollection[index]}
                </>
            ))}
        </div>
    );
};

Stepper.defaultProps = defaultProps;

function getSeparators(children: ReactNode, separatorSlot: ReactNode) {
    return Array(Children.count(children) - 1)
        .fill(separatorSlot);
}

function getChildStatus(index: number, activeIndex: number) {
    if (index === activeIndex) {
        return Status.ACTIVE;
    }
    if (index < activeIndex) {
        return Status.COMPLETED;
    }
}

export default memo(Stepper);
