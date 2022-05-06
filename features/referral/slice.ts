import type { PayloadAction } from "@reduxjs/toolkit";
import type { ReferralInfo, ReferralJob, ReferralWorkspace } from "@/entities/referral";

import { createSlice } from "@reduxjs/toolkit";

export type ReferralStepState = ReferralInfo | ReferralJob | ReferralWorkspace;

type ActionPayoad = {
    readonly step: number;
    readonly data: ReferralStepState;
};

const initialState: [ReferralInfo?, ReferralJob?, ReferralWorkspace?] = [];

const referralSlice = createSlice({
    name: 'referral',
    initialState,
    reducers: {
        add: (state, { payload: { step, data } }: PayloadAction<ActionPayoad>) => {
            state[step] = data;
        },
        clear: () => initialState
    }
});

export const { add, clear } = referralSlice.actions;

export default referralSlice;
