import type { ReactElement } from "react";

import { redirectQueryParam, Routes } from "@/constants/routes";

export type Config = {
    readonly redirectTo?: Routes;
    readonly loaderComponent?: ReactElement | null;
    readonly redirectQueryParamName?: typeof redirectQueryParam;
    readonly setSignOutPath?: boolean;
};

export const getDefaultConfig = (config: Config = {}) => ({
    loaderComponent: null,
    redirectQueryParamName: redirectQueryParam,
    ...config
});
