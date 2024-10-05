import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// old backend: https://66f3151c71c84d805877c872.mockapi.io
// new backend: https://connections-api.goit.global
// Contact schema:
// {
// id	string
// name*	string
// number*	string
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

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery,
  endpoints: build => ({
    getAllContacts: build.query({
      query: () => `/contacts`,
      // transformResponse: response => response.data,
      // transformErrorResponse: response => response.status,
      providesTags: ["Contacts"],
    }),

    addContact: build.mutation({
      query: contact => ({
        url: `/contacts`,
        method: "POST",
        body: contact,
      }),

      invalidatesTags: ["Contacts"],
    }),

    deleteContact: build.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Contacts"],
    }),

    editContact: build.mutation({
      query: contact => ({
        url: `/contacts/${contact.id}`,
        method: "PATCH",
        body: contact,
      }),

      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = contactsApi;
