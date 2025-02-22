import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProject,
  fetchProjects,
  fetchProjectById,
  updateProject,
  deleteProject,
  addProjectCategory,
  fetchProjectCategories,
  updateProjectCategory,
  deleteProjectCategory,
} from "./projectsApi";
import { QUERY_KEYS } from "../queryKeys";

// Add Project
export const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProject,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] }),
  });
};

// Get All Projects
export const useGetProjects = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECTS],
    queryFn: fetchProjects,
  });
};

// Get Project by ID
export const useGetProjectById = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT_BY_ID(id),
    queryFn: () => fetchProjectById(id),
    enabled: !!id,
  });
};

// Update Project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] }),
  });
};

// Delete Project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] }),
  });
};

// Add Project Category
export const useAddProjectCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProjectCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROJECT_CATEGORIES],
      }),
  });
};

// Get Project Categories
export const useGetProjectCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECT_CATEGORIES],
    queryFn: fetchProjectCategories,
  });
};

// Update Project Category
export const useUpdateProjectCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROJECT_CATEGORIES],
      }),
  });
};

// Delete Project Category
export const useDeleteProjectCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProjectCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROJECT_CATEGORIES],
      }),
  });
};
