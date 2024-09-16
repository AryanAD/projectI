import { USERS_URL } from "../../constants";
import { apiSlice } from "../../apiSlice";
import { User } from "../../../types/userTypes";

interface RegisterOrUpdatePayload {
  username?: string;
  email?: string;
  password?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<User, RegisterOrUpdatePayload>({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        providesTags: ["Users"],
      }),
    }),

    login: builder.mutation<User, LoginPayload>({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    getProfile: builder.query<User, void>({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation<User, RegisterOrUpdatePayload>({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        providesTags: ["Users"],
      }),
    }),

    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getUserById: builder.query<User, number>({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    updateUserById: builder.mutation<
      User,
      { id: number; data: RegisterOrUpdatePayload }
    >({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUserById: builder.mutation<void, number>({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = userApiSlice;
