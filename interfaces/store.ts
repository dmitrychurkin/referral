import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { createStore } from '@/infrastructure/store';

export type AppStore = ReturnType<typeof createStore>;

export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;
