import axios from "axios";
import {
  AddOrModifyPayload,
  Category,
  Client,
  UploadLogoResponse,
} from "../../types/clients";
import {
  BASE_URL,
  CLIENT_CATEGORY_URL,
  CLIENTS_URL,
  UPLOADS_URL,
} from "../constants";

const token = localStorage.getItem("token");

const clientEndpoint = `${BASE_URL}${CLIENTS_URL}`;
const clientCategoryEndpoint = `${BASE_URL}${CLIENT_CATEGORY_URL}`;
const uploadEndpoint = `${BASE_URL}${UPLOADS_URL}`;

// Add Client
export const addClient = async (data: FormData | AddOrModifyPayload) => {
  return axios
    .post<Client>(`${clientEndpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Get All Clients
export const fetchClients = async () => {
  return axios
    .get<Client[]>(`${clientEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Get Client by ID
export const fetchClientById = async (id: number) => {
  return axios
    .get<Client>(`${clientEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Update Client
export const updateClient = async ({
  id,
  data,
}: {
  id: number;
  data: AddOrModifyPayload;
}) => {
  return axios
    .put<Client>(`${clientEndpoint}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Delete Client
export const deleteClient = async (id: number) => {
  return axios.delete<void>(`${clientEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Add Client Category
export const addClientCategory = async (name: string) => {
  return axios
    .post<Category>(
      `${clientCategoryEndpoint}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

// Get Client Categories
export const fetchClientCategories = async () => {
  return axios
    .get<Category[]>(`${clientCategoryEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Update Client Category
export const updateClientCategory = async ({
  id,
  name,
}: {
  id: number;
  name: string;
}) => {
  return axios
    .put<Category>(
      `${clientCategoryEndpoint}/${id}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

// Delete Client Category
export const deleteClientCategory = async (id: number) => {
  return axios.delete<void>(`${clientCategoryEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Upload Client Logo
export const uploadClientLogo = async (formData: FormData) => {
  return axios
    .post<UploadLogoResponse>(`${uploadEndpoint}`, formData)
    .then((res) => res.data);
};
