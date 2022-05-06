import type { GetStaticProps } from "next";
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from "@/interfaces/global";
import type { FormValues } from "@/ui/organizms/Forms/AddReferral/Info/useValidation";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import AddReferrer from "@/ui/layouts/AddReferrer";
import Info, { getInitialValues } from "@/ui/organizms/Forms/AddReferral/Info";

import { Routes } from "@/constants/routes";

import { useActions } from "@/features/referral";
import { useAppStore } from "@/infrastructure/store";

const STEP = 0;
const Register: NextPageWithLayout = () => {
    const [t] = useTranslation('referral');
    const store = useAppStore()
    const router = useRouter();
    const { add } = useActions();

    const onSubmit = (formValues: FormValues) => {
        add(STEP, formValues);
        router.push(Routes.ADD_REFERRAL_JOB);
    };

    return (
        <Info
            t={t}
            initialValues={getInitialValues(store.getState().referral[STEP])}
            onSubmit={onSubmit}
        />
    );
};

Register.getLayout = (page: ReactElement) => (
    <AddReferrer step={STEP}>
        {page}
    </AddReferrer>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale as string, ['dashboard-common', 'referral'])
    }
});

export default Register;
