import type { PropsWithChildren } from 'react';
import type { BaseProps, PropsWithClasses } from "@/interfaces/global";
import type { ContentWrapperClasses } from '@/ui/atoms/ContentWrapper';
import ContentWrapper from "@/ui/atoms/ContentWrapper";
import { memo } from "react";
import clsx from 'clsx';

import styles from './Navbar.module.css';
import Logo from "@/ui/atoms/Logo";

export type Props = PropsWithChildren<
    BaseProps &
    PropsWithClasses<ContentWrapperClasses | 'actionArea'> &
    typeof defaultProps
>;

const defaultProps = {
    classes: {}
};

const Navbar = ({ className, classes, children }: Props) => (
    <ContentWrapper
        classes={{
            root: clsx(classes.root, className),
            wrapper: clsx(styles.root, classes.wrapper)
        }}
    >
        <Logo />
        <div className={classes.actionArea}>{children}</div>
    </ContentWrapper>
);

Navbar.defaultProps = defaultProps;

export default memo(Navbar);
