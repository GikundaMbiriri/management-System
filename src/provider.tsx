"use client";
import { useEffect } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { extendedApiSlice } from "./app/programs/programSlice";
import { useRefreshTokenQuery } from "./app/auth/authApiSlice";
import { setCredentials } from "./app/auth/authSlice";
store.dispatch(
  extendedApiSlice.endpoints.getPrograms.initiate(
    "/programme/programmes?pageNum=1&pageSize=10"
  )
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
