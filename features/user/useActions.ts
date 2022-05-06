import type { UserState } from "./slice";

import { useCallback } from "react";

import { useAppDispatch } from "@/infrastructure/store";

import { change as changeUser, clear as clearUser } from "./slice";

const useActions = () => {
    const dispatch = useAppDispatch();

    const change = useCallback((userState: UserState) => {
        dispatch(changeUser(userState));
    }, [dispatch]);

    const clear = useCallback(() => {
        dispatch(clearUser());
    }, [dispatch]);

    return {
        change,
        clear
    };
};

export default useActions;
