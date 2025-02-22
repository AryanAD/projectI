import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllTasks,
  fetchUserTasks,
  fetchTaskById,
  assignProjectToUser,
  deleteTask,
  updateTask,
} from "./tasksApi";
import { QUERY_KEYS } from "../queryKeys";

// Fetch all tasks
export const useAllTasks = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: fetchAllTasks,
  });
};

// Fetch tasks for a specific user
export const useUserTasks = (userId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_TASKS(userId),
    queryFn: () => fetchUserTasks(userId),
    enabled: !!userId,
  });
};

// Fetch a single task by ID
export const useTaskById = (taskId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.TASK_BY_ID(taskId),
    queryFn: () => fetchTaskById(taskId),
    enabled: !!taskId,
  });
};

// Assign a project to a user
export const useAssignProjectToUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignProjectToUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
    },
  });
};

// Update task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TASK_BY_ID(variables.taskId),
      });
    },
  });
};

// Delete a task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
    },
  });
};
