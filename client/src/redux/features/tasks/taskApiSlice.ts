import { TASKS_URL } from "../../constants";
import { apiSlice } from "../../apiSlice";
import { Task } from "../../../types/taskTypes";

interface CreateOrUpdatePayload {
  name?: string;
  description?: string;
  status?: string;
}

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation<Task, CreateOrUpdatePayload>({
      query: (data) => ({
        url: `${TASKS_URL}`,
        method: "POST",
        body: data,
        providesTags: ["Tasks"],
      }),
    }),
    getTask: builder.query<Task, void>({
      query: () => ({
        url: `${TASKS_URL}`,
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),

    getTaskById: builder.query<Task, number>({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<
      Task,
      { id: number; data: CreateOrUpdatePayload }
    >({
      query: ({ id, data }) => ({
        url: `${TASKS_URL}/${id}`,
        method: "PUT",
        body: data,
        providesTags: ["Tasks"],
      }),
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetTaskQuery,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
