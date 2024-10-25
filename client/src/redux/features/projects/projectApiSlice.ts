import { PROJECT_CATEGORY_URL, PROJECTS_URL } from "../../constants";
import { apiSlice } from "../../apiSlice";
import { Category, Project } from "../../../types/projectTypes";

interface CreateOrUpdatePayload {
  name?: string;
  details?: string;
  categoryId?: number;
  status?: string;
  deadline?: string;
}

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation<Project, CreateOrUpdatePayload>({
      query: (data) => ({
        url: `${PROJECTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects"],
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
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation<void, number>({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),

    addProjectCategory: builder.mutation<Category, string>({
      query: (data) => ({
        url: `${PROJECT_CATEGORY_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProjectCategories"],
    }),
    getProjectCategories: builder.query<Category[], void>({
      query: () => ({
        url: `${PROJECT_CATEGORY_URL}`,
        method: "GET",
      }),
      providesTags: ["ProjectCategories"],
    }),
    updateProjectCategories: builder.mutation<
      Category,
      { id: number; name: string }
    >({
      query: ({ id, name }) => ({
        url: `${PROJECT_CATEGORY_URL}/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["ProjectCategories"],
    }),
    deleteProjectCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `${PROJECT_CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectCategories"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetProjectQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddProjectCategoryMutation,
  useGetProjectCategoriesQuery,
  useUpdateProjectCategoriesMutation,
  useDeleteProjectCategoryMutation,
} = projectApiSlice;
