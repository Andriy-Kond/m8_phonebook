import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// User schema:
// {
// id	string
// name*	string
// email*	string
// password*	string
// }

const baseQuery = fetchBaseQuery({
  baseUrl: "https://connections-api.goit.global",
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token;

  //   // If we have a token set in state, let's assume that we should be passing it.
  //   if (token) {
  //     headers.set("authorization", `Bearer ${token}`);
  //   }

  //   return headers;
  // },
});

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  endpoints: build => ({
    getUserCredentials: build.query({
      query: () => `/users/current`,
      // transformResponse: response => response.data,
      // transformErrorResponse: response => response.status,
      providesTags: ["Users"],
    }),

    signupUser: build.mutation({
      query: user => ({
        url: `/users/signup`,
        method: "POST",
        body: user,
        // user body schema:
        // {
        //   "name": "Adrian Cross",
        //   "email": "across@mail.com",
        //   "password": "examplepwd12345"
        // }
      }),

      invalidatesTags: ["Users"],
    }),

    loginUser: build.mutation({
      query: user => ({
        url: `/users/login`,
        method: "POST",
        body: user,
        // user body schema:
        // {
        //   "email": "string",
        //   "password": "string"
        // }
      }),

      invalidatesTags: ["Users"],
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),

      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = usersApi;
