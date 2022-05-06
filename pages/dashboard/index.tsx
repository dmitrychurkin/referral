import type { GetStaticProps } from "next";
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from "@/interfaces/global";

import { useState, useEffect, Fragment } from 'react';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import DashboardLayout from '@/ui/layouts/Dashboard';
import { FirstVisit, Empty, Pending } from "@/ui/organizms/Dashboard";

import { getCurrentUser, isNewUser } from "@/services/user";
import { getReferralsByUserId } from "@/services/referrer";

const Dashboard: NextPageWithLayout = () => {
    const [Component, setComponent] = useState(<Fragment />);

    useEffect(() => {
        if (isNewUser()) {
            setComponent(<FirstVisit />);
            return;
        }

        getReferralsByUserId(
            getCurrentUser()!.uid
        )
            .then((size: number) => {
                setComponent(
                    size ? <Pending size={size} /> : <Empty />
                );
            });
    }, []);

    return Component;
};

Dashboard.getLayout = (page: ReactElement) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale as string, ['dashboard'])
    }
});

export default Dashboard;
