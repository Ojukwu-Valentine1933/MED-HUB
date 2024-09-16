import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { patientApi } from "./patientApi";
import { clearCurrentpatient } from "../redux/patientSlice";

let baseUrl = "https://med-hub.onrender.com";

export const patientAuthApi = createApi({
  reducerPath: "patientAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    loginPatient: builder.mutation({
      query: (patientData) => ({
        url: "patient/auth/login",
        method: "POST",
        body: patientData,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const patient = response.data;
          dispatch(
            patientApi.util.updateQueryData("currentPatient", () => patient)
          );
        } catch (error) {
          console.error("Failed to login patient", error);
        }
      },
    }),

    logoutPatient: builder.mutation({
      query: () => ({
        url: "patient/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCurrentpatient());
        } catch (error) {
          console.error("Failed to logout patient", error);
        }
      },
    }),

    recoverpassword: builder.mutation({
      query: (email) => ({
        url: "patient/auth/forgotten-password",
        method: "POST",
        body: email , // Ensure the email is sent as an object
        credentials: "include", // Add this if your API requires credentials
      }),
    }),
  }),
});

export const {
  useLoginPatientMutation,
  useLogoutPatientMutation,
  useRecoverpasswordMutation,
} = patientAuthApi;
