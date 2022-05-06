/* eslint-disable @next/next/link-passhref */
import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import AddPerson from "@/ui/icons/AddPerson";
import Button, { Variants } from "@/ui/atoms/Button";

import { Routes } from '@/constants/routes';

import styles from './Dashboard.module.css';

type Props = {
    readonly size: number;
};

const Pending = ({ size }: Props) => {
    const [t] = useTranslation('dashboard');

    return (
        <div className={styles.pending}>
            <Image
                src='/wait.svg'
                width={111}
                height={126}
                alt=''
            />
            <h5>{t('pending.title')}</h5>
            <p className={styles.content}>{t('pending.content', { size })}</p>
            <Link href={Routes.ADD_REFERRAL_INFO}>
                <Button
                    startIcon={<AddPerson />}
                    variant={Variants.CONTAINED}
                >
                    {t('action')}
                </Button>
            </Link>
        </div>
    );
};

export default memo(Pending);
