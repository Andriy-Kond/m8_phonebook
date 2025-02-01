import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { persistedUserAuthReducer } from "features/auth/authSlice";

import { contactsApi } from "features/contacts/contactsSlice";
import { filtersSlice } from "features/filters/filtersSlice";
import { usersApi } from "features/Users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: persistedUserAuthReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    filters: filtersSlice.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    contactsApi.middleware,
    usersApi.middleware,
  ],
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
