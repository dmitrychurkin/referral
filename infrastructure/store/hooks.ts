import type { AppDispatch, AppState } from "@/interfaces/store";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

export const useAppStore = () => useStore<AppState>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
