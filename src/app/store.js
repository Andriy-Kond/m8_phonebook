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

import { filtersSlice } from "features/filters/filtersSlice";
import { contactsApi } from "features/contacts/contactsSlice";
import { persistedUserAuthReducer, usersApi } from "features/Users/UsersSlice";

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    filters: filtersSlice.reducer,
    auth: persistedUserAuthReducer,
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
