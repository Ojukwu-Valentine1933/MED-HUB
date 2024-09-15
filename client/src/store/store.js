import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../lib/redux/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import patientSlice from "../lib/redux/patientSlice";
import { patientApi } from "../lib/APIs/patientApi";
import { patientAuthApi } from "../lib/APIs/patientAuthApis";
export const store = configureStore({
  reducer: {
    [patientApi.reducerPath]: patientApi.reducer,
    [patientAuthApi.reducerPath]: patientAuthApi.reducer,
    authState: authReducer,
    userState: patientSlice,
  },
  devTools: process.env.NODE_ENV === "development",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      patientApi.middleware,
      patientAuthApi.middleware
    ),
});

setupListeners(store.dispatch);
