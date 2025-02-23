import axios from "axios";
import { Task } from "../../types/tasks";
import { BASE_URL, TASKS_URL } from "../constants";

const token = localStorage.getItem("token");
const taskEndpoint = `${BASE_URL}${TASKS_URL}`;

// Fetch all tasks
export const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get(taskEndpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fetch tasks for a specific user
export const fetchUserTasks = async (userId: number): Promise<Task[]> => {
  const response = await axios.get(`${taskEndpoint}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fetch a single task by ID
export const fetchTaskById = async (taskId: number): Promise<Task> => {
  const response = await axios.get(`${taskEndpoint}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Assign a project to a user
export const assignProjectToUser = async (data: {
  title: string;
  description: string;
  status: string;
  userIds: number[];
  dueDate: string;
  priority: string;
  projectId: number;
  clientId?: number;
}): Promise<Task> => {
  const response = await axios.post(`${taskEndpoint}/assign`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update task
export const updateTask = async ({
  taskId,
  data,
}: {
  taskId: number;
  data: {
    title: string;
    description: string;
    status: string;
    userIds: number[];
    projectId: number;
    clientId?: number;
  };
}): Promise<Task> => {
  const response = await axios.put(`${taskEndpoint}/${taskId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${taskEndpoint}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
