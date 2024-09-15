import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentPatient } from "../redux/patientSlice";
const baseUrl = "http://localhost:3001"

 
// Function to handle token refresh//
const refreshAccessToken = async () => {
  const response = await fetch(`${baseUrl}/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }
  return response.json();
};

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    createNewPatient: builder.mutation({
      query: (patientData) => ({
        url: "/patient/auth/new-patient",
        method: "POST",
        body: patientData,
      }),
    }),

    getCurrentPatient: builder.mutation({
      query: () => ({
        url: "/patient/current-patient",
        method: "GET",
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentPatient(data?.patient));
        } catch (error) {
          if (error.status === 403) {
            try {
              await refreshAccessToken();
              // Retry the original query
              const { data } = await queryFulfilled;
              dispatch(setCurrentPatient(data?.patient));
            } catch (refreshError) {
              console.error("Failed to refresh access token", refreshError);
            }
          } else {
            console.error("Failed to fetch current patient", error);
          }
        }
      },
    }),
  }),
});

export const { useCreateNewPatientMutation, useGetCurrentPatientMutation } =
  patientApi;
