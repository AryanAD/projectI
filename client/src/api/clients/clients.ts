import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addClient,
  fetchClients,
  fetchClientById,
  updateClient,
  deleteClient,
  addClientCategory,
  fetchClientCategories,
  updateClientCategory,
  deleteClientCategory,
  uploadClientLogo,
} from "./clientsApi";
import { QUERY_KEYS } from "../queryKeys";

// Add Client
export const useAddClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS] });
    },
  });
};

// Get All Clients
export const useGetClients = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLIENTS],
    queryFn: fetchClients,
  });
};

// Get Client by ID
export const useGetClientById = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.CLIENT_BY_ID(id),
    queryFn: () => fetchClientById(id),
  });
};

// Update Client
export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS] });
    },
  });
};

// Delete Client
export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CLIENTS] });
    },
  });
};

// Add Client Category
export const useAddClientCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addClientCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CLIENT_CATEGORIES],
      });
    },
  });
};

// Get Client Categories
export const useGetClientCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLIENT_CATEGORIES],
    queryFn: fetchClientCategories,
  });
};

// Update Client Category
export const useUpdateClientCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClientCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CLIENT_CATEGORIES],
      });
    },
  });
};

// Delete Client Category
export const useDeleteClientCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClientCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CLIENT_CATEGORIES],
      });
    },
  });
};

// Upload Client Logo
export const useUploadClientLogo = () => {
  return useMutation({
    mutationFn: uploadClientLogo,
  });
};
