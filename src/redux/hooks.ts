import { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector, useStore } from "react-redux";
import { RootState, AppDispatch, AppStore } from "./store";

//? Create pre-typed versions of the useDispatch and useSelector hooks for usage in the application.
export const useAppDispatch: () => AppDispatch = useDispatch //i no need to write useDispatch(AppDispatch)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector //i no need to write useSelector(state: RootState) in every place
export const useAppStore: () => AppStore = useStore