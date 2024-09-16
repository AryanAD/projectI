import { PROJECTS_URL } from "../../constants";
import { apiSlice } from "../../apiSlice";
import { Project } from "../../../types/projectTypes";

interface CreateOrUpdatePayload {
  name?: string;
  details?: string;
  category?: string;
  status?: string;
}

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation<Project, CreateOrUpdatePayload>({
      query: (data) => ({
        url: `${PROJECTS_URL}`,
        method: "POST",
        body: data,
        providesTags: ["Projects"],
      }),
    }),
    getProject: builder.query<Project, void>({
      query: () => ({
        url: `${PROJECTS_URL}`,
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),

    getProjectById: builder.query<Project, number>({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
    updateProject: builder.mutation<
      Project,
      { id: number; data: CreateOrUpdatePayload }
    >({
      query: ({ id, data }) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: "PUT",
        body: data,
        providesTags: ["Projects"],
      }),
    }),
    deleteProject: builder.mutation<void, number>({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetProjectQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApiSlice;
