import type { PropsWithChildren, ReactElement } from 'react';
import type { PropsWithClasses } from '@/interfaces/global';

import { memo } from "react";

import ContentWrapper from '@/ui/atoms/ContentWrapper';

import styles from './Formable.module.css';

type Props = PropsWithChildren<
    & PropsWithClasses<'root' | 'wrapper'>
    & {
        readonly headerSlot: ReactElement
    }
    & typeof defaultProps
>;

const defaultProps = {
    classes: {}
};

const Formable = ({ classes, headerSlot, children }: Props) => (
    <>
        {headerSlot}
        <ContentWrapper
            classes={{
                root: styles.root,
                wrapper: styles.wrapper,
                ...classes,
            }}
        >
            {children}
        </ContentWrapper>
    </>
);

Formable.defaultProps = defaultProps;

export default memo(Formable);