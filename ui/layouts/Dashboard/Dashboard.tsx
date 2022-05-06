import type { PropsWithChildren } from "react";

import { memo, useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { withAuth } from "@/infrastructure/auth";

import Formable from "@/ui/templates/Formable";
import AppBar from "@/ui/organizms/AppBar";
import Button, { Variants } from "@/ui/atoms/Button";

import Exit from "public/exit.svg";

import { isNewUser, signout, removeNewUserFlag } from "@/services/user";

import styles from './Dashboard.module.css';

type Props = PropsWithChildren<{
    readonly i18ns?: string;
}>;

const Dashboard = ({ i18ns = 'dashboard', children }: Props) => {
    const [t] = useTranslation(i18ns);
    const router = useRouter();

    useEffect(() => {
        router.events.on('routeChangeStart', removeNewUserFlag);

        return () => {
            router.events.off('routeChangeStart', removeNewUserFlag);
        }
    }, [router.events]);

    return (
        <Formable
            classes={{
                wrapper: styles.wrapper
            }}
            headerSlot={
                <AppBar
                    className={clsx(
                        styles.navbar,
                        isNewUser() && styles.newUserNavbar
                    )}
                >
                    <Button
                      startIcon={<Exit />}
                      variant={Variants.ROUNDED}
                      onClick={signout}>{t('header.action')}</Button>
                </AppBar>
            }
        >
            {children}
        </Formable>
    );
};

export default memo(
    withAuth<Props>(Dashboard)
);
