import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { loginApi } from "features/login/loginSlice";
import { tasksApi } from "features/tasks/tasksSlice";
import { filtersSlice } from "features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,

    filters: filtersSlice.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    tasksApi.middleware,
    loginApi.middleware,
  ],
});

setupListeners(store.dispatch);
