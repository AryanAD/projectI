import { CLIENTS_URL } from "../../constants";
import { apiSlice } from "../../apiSlice";
import { Client } from "../../../types/clientTypes";

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

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addClient: builder.mutation<Client, AddOrModifyPayload>({
      query: (data) => ({
        url: `${CLIENTS_URL}`,
        method: "POST",
        body: data,
        providesTags: ["Clients"],
      }),
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
  }),
});

export const {
  useAddClientMutation,
  useGetClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApiSlice;
