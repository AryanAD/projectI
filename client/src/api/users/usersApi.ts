import axios from "axios";
import {
  RegisterOrUpdatePayload,
  UploadImageResponse,
  User,
} from "../../types/users";
import { BASE_URL, UPLOADS_URL, USERS_URL } from "../constants";

const token = localStorage.getItem("token");

const userEndpoint = `${BASE_URL}${USERS_URL}`;
const uploadEndpoint = `${BASE_URL}${UPLOADS_URL}`;

// Register User
export const registerUser = async (
  data: FormData | RegisterOrUpdatePayload
) => {
  return axios.post<User>(`${userEndpoint}`, data).then((res) => res.data);
};

// Login User
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axios
    .post<User>(`${userEndpoint}/login`, { email, password })
    .then((res) => res.data);
};

// Logout User
export const logoutUser = async () => {
  localStorage.clear();
  return axios.post<void>(`${userEndpoint}/logout`);
};

// Get User Profile
export const fetchUserProfile = async () => {
  return axios
    .get<User>(`${userEndpoint}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Update User Profile
export const updateUserProfile = async (data: RegisterOrUpdatePayload) => {
  return axios
    .put<User>(`${userEndpoint}/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Get All Users
export const fetchAllUsers = async () => {
  return axios
    .get<User[]>(`${userEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Get User by ID
export const fetchUserById = async (id: number) => {
  return axios
    .get<User>(`${userEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Update User by ID
export const updateUserById = async ({
  id,
  data,
}: {
  id: number;
  data: RegisterOrUpdatePayload;
}) => {
  return axios
    .put<User>(`${userEndpoint}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Delete User by ID
export const deleteUserById = async (id: number) => {
  return axios.delete<void>(`${userEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Upload User Image
export const uploadUserImage = async (formData: FormData) => {
  return axios
    .post<UploadImageResponse>(`${uploadEndpoint}`, formData)
    .then((res) => res.data);
};
