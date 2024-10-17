import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://connections-api.goit.global",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  endpoints: build => ({
    signupUser: build.mutation({
      query: user => ({
        url: `/users/signup`,
        method: "POST",
        body: user,
      }),

      invalidatesTags: ["User"],
    }),

    loginUser: build.mutation({
      query: user => ({
        url: `/users/login`,
        method: "POST",
        body: user,
      }),

      invalidatesTags: ["User"],
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),

      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,

      // invalidatesTags: ["User"],
      // Після виходу (UserMenu - handleLogout) я очищую стан за допомогою resetApiState(). Тому інвалідувати залежність тут не потрібно. Вона лише викликає додаткові запити на сервер після виходу. А вони не потрібні.
    }),

    getUserByToken: build.query({
      query: () => ({
        url: `/users/current`,
        method: "GET",
        // transformResponse: response => response.data,
        // transformErrorResponse: response => response.status,
      }),

      // refetchOnReconnect: true,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserByTokenQuery,
} = usersApi;
