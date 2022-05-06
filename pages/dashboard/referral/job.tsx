import type { GetStaticProps } from "next";
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from "@/interfaces/global";
import type { FormValues } from "@/ui/organizms/Forms/AddReferral/Job/useValidation";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import AddReferrer from "@/ui/layouts/AddReferrer";
import JobForm, { getInitialValues } from "@/ui/organizms/Forms/AddReferral/Job";

import { Routes } from "@/constants/routes";

import { useActions } from "@/features/referral";
import { useAppStore } from "@/infrastructure/store";

const STEP = 1;
const Job: NextPageWithLayout = () => {
    const [t] = useTranslation('referral-job');
    const router = useRouter();
    const store = useAppStore();
    const { add } = useActions();

    const onSubmit = (formValues: FormValues) => {
        add(STEP, formValues);
        router.push(Routes.ADD_REFERRAL_WORKPACE);
    };

    return (
        <JobForm
            t={t}
            initialValues={getInitialValues(store.getState().referral[STEP])}
            onSubmit={onSubmit}
        />
    );
};

Job.getLayout = (page: ReactElement) => (
    <AddReferrer step={STEP}>
        {page}
    </AddReferrer>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale as string, ['dashboard-common', 'referral-job'])
    }
});

export default Job;
