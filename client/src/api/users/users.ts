import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  uploadUserImage,
  loginUser,
  logoutUser,
  fetchUserProfile,
  updateUserProfile,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
  deleteUserById,
} from "./usersApi";
import { QUERY_KEYS } from "../queryKeys";

// Register User
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

// Login User
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.role);
    },
  });
};

// Logout User
export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};

// Get User Profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: fetchUserProfile,
  });
};

// Update User Profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
    },
  });
};

// Get All Users
export const useGetAllUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchAllUsers,
  });
};

// Get User by ID
export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_BY_ID(id),
    queryFn: () => fetchUserById(id),
  });
};

// Update User by ID
export const useUpdateUserById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
};

// Delete User by ID
export const useDeleteUserById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
};

// Upload User Image
export const useUploadUserImage = () => {
  return useMutation({
    mutationFn: uploadUserImage,
  });
};
