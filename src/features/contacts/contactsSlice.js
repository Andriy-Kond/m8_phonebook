import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66f3151c71c84d805877c872.mockapi.io",
  }),

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
        method: "PUT",
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
