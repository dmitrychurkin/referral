/* eslint-disable @next/next/link-passhref */
import { memo } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import AddPerson from "@/ui/icons/AddPerson";
import Button, { Variants } from "@/ui/atoms/Button";

import { Routes } from '@/constants/routes';

import styles from './Dashboard.module.css';

const FirstVisit = () => {
    const [t] = useTranslation('dashboard');

    return (
        <div className={styles.firstTime}>
            <h2 className="header">{t('firstVisit.title')}</h2>
            <p className={styles.content}>{t('firstVisit.content')}</p>
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

export default memo(FirstVisit);
