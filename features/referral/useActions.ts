import type { ReferralStepState } from "./slice";

import { useCallback } from "react";

import { useAppDispatch } from "@/infrastructure/store";

import { add as addStep, clear as clearReferral } from "./slice";

const useActions = () => {
    const dispatch = useAppDispatch();

    const add = useCallback((step: number, data: ReferralStepState) => {
        dispatch(addStep({
            step,
            data
        }));
    }, [dispatch]);

    const clear = useCallback(() => {
        dispatch(clearReferral());
    }, [dispatch]);

    return {
        add,
        clear
    };
};

export default useActions;
