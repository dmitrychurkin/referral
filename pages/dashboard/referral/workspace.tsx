import type { GetStaticProps } from "next";
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from "@/interfaces/global";
import type { Referral } from "@/entities/referral";
import type { FormValues } from "@/ui/organizms/Forms/AddReferral/Workspace/useValidation";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import AddReferrer from "@/ui/layouts/AddReferrer";
import WorkspaceForm, { getInitialValues } from "@/ui/organizms/Forms/AddReferral/Workspace";

import { Routes } from "@/constants/routes";

import { useAppStore } from "@/infrastructure/store";

import { getFilePath, save, uploadFile } from "@/services/referrer";
import { getCurrentUser } from "@/services/user";

const STEP = 2;
const Workspace: NextPageWithLayout = () => {
    const [t] = useTranslation('referral-workspace');
    const router = useRouter();
    const store = useAppStore();

    const onSubmit = async (formValues: FormValues) => {
        const [
            { ...referralInfo },
            { ...referralJob }
        ] = store.getState().referral;

        const { resume, ...restReferralInfo } = referralInfo;

        const referral: Referral = {
            ...restReferralInfo,
            ...referralJob,
            ...formValues,
            userId: getCurrentUser()!.uid
        };

        await save(referral)
            .then(referralId => {
                if (resume) {
                    uploadFile(resume, getFilePath(referralId));
                }
                router.push(Routes.DASHBOARD);
            });
    };

    return (
        <WorkspaceForm
            t={t}
            initialValues={getInitialValues(store.getState().referral[STEP])}
            onSubmit={onSubmit}
        />
    );
};

Workspace.getLayout = (page: ReactElement) => (
    <AddReferrer step={STEP}>
        {page}
    </AddReferrer>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale as string, ['dashboard-common', 'referral-workspace'])
    }
});

export default Workspace;
