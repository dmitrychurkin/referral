import type { PropsWithTFunc } from "@/interfaces/global";
import { Trans } from "next-i18next";

import Image from "next/image";
import { memo } from "react";

import styles from './Employer.module.css';

type Props =
    & PropsWithTFunc
    & {
        readonly email: string;
    };

const Employer = ({ t, email }: Props) => (
    <div className={styles.root}>
        <Image
            src='/employer.svg'
            width={157}
            height={110}
            alt=''
        />
        <h5 className={styles.title}>{t('title')}</h5>
        <Trans
            ns="employer"
            i18nKey="sub"
            values={{ email }}
            components={{ bold: <strong /> }}
        />
    </div>
);

export default memo(Employer);
