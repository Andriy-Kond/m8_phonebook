import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const userAuthSlice = createSlice({
  name: "auth",
  initialState: {
    userToken: null,
    isLoggedIn: false,
  },
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },

    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

const persistConfig = {
  key: "authUserToken",
  storage,
  whitelist: ["userToken"],
};

export const persistedUserAuthReducer = persistReducer(
  persistConfig,
  userAuthSlice.reducer,
);

export const { setUserToken, setIsLoggedIn } = userAuthSlice.actions;

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
