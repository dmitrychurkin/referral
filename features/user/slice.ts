import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/entities/user";

import { createSlice } from "@reduxjs/toolkit";

export type UserState = Partial<User>;

const initialState: UserState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        change: (state, { payload }: PayloadAction<UserState>) => ({
            ...state,
            ...payload
        }),
        clear: () => initialState
    }
});

export const { change, clear } = userSlice.actions;

export default userSlice;
