/* eslint-disable @next/next/link-passhref */
import type { Props as SubmitActionProps } from "@/ui/molecules/SubmitAction";

import { memo } from "react";
import Link from "next/link";

import { Routes } from "@/constants/routes";

import Button, { Variants } from "@/ui/atoms/Button";
import SubmitAction from "@/ui/molecules/SubmitAction";

import styles from './Signin.module.css';

import Person from 'public/person.svg';

type Props = Omit<SubmitActionProps, 'variant'>;

const ActionSlot = ({ t, isSubmitting, isValid, startIcon }: Props) => (
    <>
        <SubmitAction
            startIcon={startIcon}
            w100
            isSubmitting={isSubmitting}
            isValid={isValid}
            t={t}
        />
        <div className={styles.hint}>{t('register.hint')}</div>
        <Link href={Routes.REGISTER}>
            <Button
                type='button'
                startIcon={<Person />}
                w100
                variant={Variants.OUTLINED}
            >
                {t('register.action')}
            </Button>
        </Link>
    </>
);

export default memo(ActionSlot);
