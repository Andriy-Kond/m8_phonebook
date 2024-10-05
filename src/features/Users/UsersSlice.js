import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const userAuthSlice = createSlice({
  name: "auth",
  initialState: {
    userToken: null,
    user: { name: null, email: null },
    isLoggedIn: false,
  },
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },

    getUserToken: state => {
      return state.userToken;
    },

    setUserCredentials: (state, action) => {
      state.user = action.payload;
    },

    setIsLoggedIn: state => {
      state.isLoggedIn = true;
    },
  },
});

const persistConfig = {
  key: "userToken",
  storage,
  whitelist: ["userToken"],
};

export const persistedUserAuthReducer = persistReducer(
  persistConfig,
  userAuthSlice.reducer,
);

export const { setUserToken, getUserToken, setUserCredentials, setIsLoggedIn } =
  userAuthSlice.actions;

// Base User schema:
// {
// id	string
// name*	string
// email*	string
// password*	string
// }

const baseQuery = fetchBaseQuery({
  baseUrl: "https://connections-api.goit.global",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    console.log("token:::", token);

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
      query: user => {
        console.log("user:::", user);

        return {
          url: `/users/signup`,
          method: "POST",
          body: user,
          // user body schema:
          // {
          //   "name": "Adrian Cross",
          //   "email": "across@mail.com",
          //   "password": "examplepwd12345"
          // }
        };
      },

      invalidatesTags: ["User"],
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

      invalidatesTags: ["User"],
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),

      invalidatesTags: ["User"],
    }),

    getUserCredentials: build.query({
      query: () => `/users/current`,
      // transformResponse: response => response.data,
      // transformErrorResponse: response => response.status,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserCredentialsQuery,
} = usersApi;
