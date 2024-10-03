import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66f3151c71c84d805877c872.mockapi.io",
  }),

  endpoints: builder => ({
    fetchLogin: builder.query({
      query: () => `tasks/`,
    }),
  }),
});

export const { useGetAllTasksQuery } = loginApi;
