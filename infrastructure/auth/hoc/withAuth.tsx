/* eslint-disable react/display-name */
import type { FunctionComponent } from 'react';
import type { Config } from './config';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { redirectSignOutRoute, shouldRememberSignOutRoute } from '@/constants/routes';

import { useUser } from '../hooks';
import { getDefaultConfig } from './config';

const withAuth = <T extends object>(
    Component: FunctionComponent<T>,
    config?: Config
) => {
    const {
        loaderComponent,
        redirectQueryParamName,
        redirectTo = redirectSignOutRoute,
        setSignOutPath = shouldRememberSignOutRoute
    } = getDefaultConfig(config);

    return (props: T) => {
        const router = useRouter();
        const user = useUser();

        useEffect(() => {
            if (user === null) {
                const getQuery = () => {
                    if (setSignOutPath) {
                        return {
                            [redirectQueryParamName]: location.href.replace(location.origin, '')
                        }
                    }
                };

                router.replace({
                    pathname: redirectTo,
                    query: getQuery()
                });
            }
        }, [router, user]);

        if (user) {
            return (
                <Component {...props as T} />
            );
        }

        return loaderComponent;
    };
};

export default withAuth;
