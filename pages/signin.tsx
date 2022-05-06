import type { GetStaticProps } from "next";
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from "@/interfaces/global";
import type { FormValues } from "@/ui/organizms/Forms/Signin/useValidation";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { signin } from '@/services/user';
import { useAppStore } from "@/infrastructure/store";

import RegisterWithRedirect from '@/ui/layouts/Register';
import Signin, { getInitialValues } from "@/ui/organizms/Forms/Signin";

const Signup: NextPageWithLayout = () => {
    const [t] = useTranslation('signin');
    const store = useAppStore();

    const onSubmit = (formValues: FormValues) =>
        signin(formValues);

    return (
        <Signin
            t={t}
            initialValues={getInitialValues(store.getState().user)}
            onSubmit={onSubmit}
        />
    );
};

Signup.getLayout = (page: ReactElement) => (
    <RegisterWithRedirect>
        {page}
    </RegisterWithRedirect>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale as string, ['common', 'signin'])
    }
});

export default Signup;
