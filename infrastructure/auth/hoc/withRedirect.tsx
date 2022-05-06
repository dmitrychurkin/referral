/* eslint-disable react/display-name */
import type { FunctionComponent } from "react";
import type { Config } from "./config";

import { useEffect } from 'react';
import { useRouter } from "next/router";

import { redirectSignInRoute } from "@/constants/routes";

import { useUser } from "../hooks";
import { getDefaultConfig } from "./config";


const withRedirect = <T extends object>(
    Component: FunctionComponent<T>,
    config?: Config
) => {
    const {
        redirectTo = redirectSignInRoute,
        loaderComponent,
        redirectQueryParamName
    } = getDefaultConfig(config);

    return (props: T) => {
        const router = useRouter();
        const user = useUser();

        useEffect(() => {
            if (user) {
                router.replace(
                    router.query[redirectQueryParamName] as string | void
                    ?? redirectTo
                );
            }
        }, [router, user]);

        if (user === null) {
            return (
                <Component {...props as T} />
            );
        }

        return loaderComponent;
    };
};

export default withRedirect;