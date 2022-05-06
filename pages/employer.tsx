import type { GetStaticProps } from "next";
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from "@/interfaces/global";
import type { FormValues } from "@/ui/organizms/Forms/Employer/useValidation";

import { useState } from 'react';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { RegisterLayout } from '@/ui/layouts/Register';
import EmployerResult from '@/ui/organizms/Employer';
import EmployerForm from "@/ui/organizms/Forms/Employer";

import { add } from "@/services/employer";

const Employer: NextPageWithLayout = () => {
    const [t] = useTranslation('employer');
    const [employer, setEmployer] = useState<string>('');

    const onSubmit = async (formValues: FormValues) => {
        await add(formValues);
        setEmployer(formValues.email);
    };

    if (employer) {
        return (
            <EmployerResult
                email={employer}
                t={t}
            />
        );
    }

    return (
        <EmployerForm
            t={t}
            onSubmit={onSubmit}
        />
    );
};

Employer.getLayout = (page: ReactElement) => (
    <RegisterLayout>
        {page}
    </RegisterLayout>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale as string, ['common', 'employer'])
    }
});

export default Employer;
