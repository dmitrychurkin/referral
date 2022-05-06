/* eslint-disable @next/next/link-passhref */
import type { PropsWithChildren } from 'react';

import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Routes } from '@/constants/routes';

import { withAuth } from '@/infrastructure/auth';
import { useAppStore } from '@/infrastructure/store';

import { useActions } from '@/features/referral';

import Stepper from '@/ui/molecules/Stepper';

import { RegisterLayout } from '../Register';

import styles from './AddReferrer.module.css';

type Props = PropsWithChildren<
    {
        readonly step?: number;
        readonly i18ns?: string;
    }
>;

const routesCollection = [
    Routes.ADD_REFERRAL_INFO,
    Routes.ADD_REFERRAL_JOB,
    Routes.ADD_REFERRAL_WORKPACE
];

const AddReferrer = ({
    children,
    step = 0,
    i18ns = 'dashboard-common'
}: Props) => {
    const [t] = useTranslation(i18ns);
    const router = useRouter();
    const store = useAppStore();
    const { clear } = useActions();

    const onChangeStep = (index: number) => {
        if (index < step) {
            const route = routesCollection[index];
            router.push(route);
        }
    };

    useEffect(() => clear, [clear]);

    if (!store.getState().referral.length && step) {
        router.push(routesCollection[0]);

        return null;
    }

    return (
        <RegisterLayout
            i18ns={i18ns}
            href={Routes.DASHBOARD}
            classes={{
                navbar: styles.navbar
            }}
        >
            <div className={styles.stepper}>
                <Stepper
                    activeIndex={step}
                    onChange={onChangeStep}
                >
                    {[
                        t('stepper.info'),
                        t('stepper.job'),
                        t('stepper.workspace')
                    ]}
                </Stepper>
            </div>
            {children}
        </RegisterLayout>
    );
};

export default memo(
    withAuth<Props>(AddReferrer)
);
