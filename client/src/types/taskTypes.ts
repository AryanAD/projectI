import { User } from "./userTypes";

export interface Task {
  id: number;
  name: string;
  description: string;
  assignedTo: number | User;
  status: "todo" | "doing" | "done";
  createdAt?: Date;
  updatedAt?: Date;
}
