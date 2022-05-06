/* eslint-disable @next/next/link-passhref */
import { memo } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import AddPerson from "@/ui/icons/AddPerson";
import Button, { Variants } from "@/ui/atoms/Button";

import { Routes } from '@/constants/routes';

import styles from './Dashboard.module.css';

const Empty = () => {
    const [t] = useTranslation('dashboard');

    return (
        <div className={styles.empty}>
            <Image
                src='/person.png'
                width={173}
                height={146}
                alt=''
            />
            <h5>{t('empty.title')}</h5>
            <p className={styles.content}>{t('empty.content')}</p>
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

export default memo(Empty);
