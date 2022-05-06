/* eslint-disable @next/next/link-passhref */
import type { PropsWithChildren } from 'react';
import type { PropsWithClasses } from '@/interfaces/global';

import { memo } from "react";
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import Button, {Variants} from '@/ui/atoms/Button';
import AppBar from '@/ui/organizms/AppBar';
import Formable from '@/ui/templates/Formable';

import { Routes } from '@/constants/routes';

import { withRedirect } from '@/infrastructure/auth';

import styles from './Register.module.css';
import clsx from 'clsx';

import BackArrow from 'public/back-arrow.svg';

type Props = Partial<
    PropsWithChildren<
        & PropsWithClasses<'navbar'>
        & {
            readonly href: Routes;
            readonly i18ns: string;
        }
    >
>;

const Register = ({
    children,
    i18ns,
    href = Routes.HOME,
    classes = {}
}: Props) => {
    const [t] = useTranslation(i18ns);

    return (
        <Formable
            headerSlot={
                <AppBar
                    className={clsx(
                        styles.navbar,
                        classes.navbar
                    )}
                >
                    <Link href={href}>
                        <Button
                          startIcon={<BackArrow />}
                          variant={Variants.ROUNDED}
                        >
                          {t('header.action')}
                        </Button>
                    </Link>
                </AppBar>
            }
        >
            {children}
        </Formable>
    );
};

export const RegisterLayout = memo(Register);

export default withRedirect<Props>(RegisterLayout);
