import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { filtersSlice } from "features/filters/filtersSlice";
import { contactsApi } from "features/contacts/contactsSlice";
import { usersApi } from "features/Users/UsersSlice";

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    filters: filtersSlice.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
    usersApi.middleware,
  ],
});

setupListeners(store.dispatch);
