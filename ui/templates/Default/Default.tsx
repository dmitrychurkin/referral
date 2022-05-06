/* eslint-disable @next/next/no-page-custom-font */
import type { PropsWithChildren } from 'react';
import { memo } from "react";
import Head from "next/head";

type Props = PropsWithChildren<object>;

const Font = ({ children }: Props) => (
    <>
        <Head>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@400;500;600;700;800&family=Noto+Sans:wght@400;700&family=Noto+Serif+Display:wght@800&display=swap"
                rel="stylesheet"
            />
        </Head>
        {children}
    </>
);

export default memo(Font);
