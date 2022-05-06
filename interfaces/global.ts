import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { TFunction } from 'next-i18next';

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
}

export type BaseProps = {
    readonly className?: string;
};

export type PropsWithClasses<T extends string> = {
    readonly classes: Partial<Record<T, string>>;
};

export type PropsWithTFunc = {
    readonly t: TFunction
};
