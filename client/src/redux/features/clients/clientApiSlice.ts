import { CLIENT_CATEGORY_URL, CLIENTS_URL, UPLOADS_URL } from "../../constants";
import { apiSlice } from "../../apiSlice";
import { Client } from "../../../types/clientTypes";
import { Category } from "../../../types/clientTypes";

interface AddOrModifyPayload {
  name?: string;
  details?: string;
  logo?: string;
  email?: string;
  phone?: string;
  location?: string;
  priority?: "normal" | "high" | "very high";
  startDate?: Date;
  endDate?: Date;
  categoryId?: number;
}

interface UploadLogoResponse {
  message: string;
  logo: string;
}

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addClient: builder.mutation<Client, AddOrModifyPayload>({
      query: (data) => ({
        url: `${CLIENTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Clients"],
    }),
    getClients: builder.query<Client[], void>({
      query: () => ({
        url: `${CLIENTS_URL}`,
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),

    getClientById: builder.query<Client, number>({
      query: (id) => ({
        url: `${CLIENTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),
    updateClient: builder.mutation<
      Client,
      { id: number; data: AddOrModifyPayload }
    >({
      query: ({ id, data }) => ({
        url: `${CLIENTS_URL}/${id}`,
        method: "PUT",
        body: data,
        providesTags: ["Clients"],
      }),
    }),
    deleteClient: builder.mutation<void, number>({
      query: (id) => ({
        url: `${CLIENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
    addClientCategory: builder.mutation<Category, string>({
      query: (data) => ({
        url: `${CLIENT_CATEGORY_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ClientCategories"],
    }),
    getClientCategories: builder.query<Category[], void>({
      query: () => ({
        url: `${CLIENT_CATEGORY_URL}`,
        method: "GET",
      }),
      providesTags: ["ClientCategories"],
    }),
    updateClientCategories: builder.mutation<
      Category,
      { id: number; name: string }
    >({
      query: ({ id, name }) => ({
        url: `${CLIENT_CATEGORY_URL}/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["ClientCategories"],
    }),
    deleteClientCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `${CLIENT_CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClientCategories"],
    }),

    uploadClientLogo: builder.mutation<UploadLogoResponse, FormData>({
      query: (formData) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useAddClientMutation,
  useGetClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useAddClientCategoryMutation,
  useGetClientCategoriesQuery,
  useUpdateClientCategoriesMutation,
  useDeleteClientCategoryMutation,
  useUploadClientLogoMutation,
} = clientApiSlice;
