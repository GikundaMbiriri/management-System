"use client";
import { store } from "./store";
import { Provider } from "react-redux";
import { extendedApiSlice } from "./app/programs/programSlice";
store.dispatch(extendedApiSlice.endpoints.getPrograms.initiate());

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
