import type { BaseProps, PropsWithClasses } from "@/interfaces/global";
import type { PropsWithChildren } from 'react';
import { memo } from "react";
import clsx from 'clsx';

import styles from './ContentWrapper.module.css';

export type ContentWrapperClasses = 'root' | 'wrapper';

type Props = PropsWithChildren<
    BaseProps &
    PropsWithClasses<ContentWrapperClasses>
>;


const ContentWrapper = ({ className, classes, children }: Props) => (
    <div className={clsx(styles.root, className, classes.root)}>
        <div className={clsx(styles.wrapper, classes.wrapper)}>{children}</div>
    </div>
);

export default memo(ContentWrapper);
