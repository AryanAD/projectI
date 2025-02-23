import axios from "axios";
import { BASE_URL, STAFF_TASKS_URL } from "../constants";

const token = localStorage.getItem("token");
const id = localStorage.getItem("userId");

export const fetchStaffTasks = async () => {
  const response = await axios.get(`${BASE_URL}${STAFF_TASKS_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateTaskStatus = async (id: number, status: string) => {
  const response = await axios.put(
    `${BASE_URL}${STAFF_TASKS_URL}/${id}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
