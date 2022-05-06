import type { GetStaticProps } from "next";
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from "@/interfaces/global";
import type { FormValues } from "@/ui/organizms/Forms/RegisterUser/useValidation";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { register, setNewUserFlag, removeNewUserFlag } from '@/services/user';
import { useAppStore } from "@/infrastructure/store";

import RegisterWithRedirect from '@/ui/layouts/Register';
import RegisterUser, { getInitialValues } from "@/ui/organizms/Forms/RegisterUser";

const Register: NextPageWithLayout = () => {
    const [t] = useTranslation('register');
    const store = useAppStore();

    const onSubmit = async (formValues: FormValues) => {
        setNewUserFlag();
        await register(formValues)
            .catch(removeNewUserFlag);
    };

    return (
        <RegisterUser
            t={t}
            initialValues={getInitialValues(store.getState().user)}
            onSubmit={onSubmit}
        />
    );
};

Register.getLayout = (page: ReactElement) => (
    <RegisterWithRedirect>
        {page}
    </RegisterWithRedirect>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale as string, ['common', 'register'])
    }
});

export default Register;
