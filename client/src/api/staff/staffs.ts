import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchStaffTasks, updateTaskStatus } from "./staffApi";
import { QUERY_KEYS } from "../queryKeys";

export const useStaffTasks = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STAFF_TASKS],
    queryFn: fetchStaffTasks,
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STAFF_TASKS] });
    },
    onError: (error) => {
      console.error("Error updating task status:", error);
    },
  });
};
