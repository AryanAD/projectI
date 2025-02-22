export interface Task {
  id: number;
  title: string;
  description: string;
  projectId: number;
  clientId?: number;
  status: "todo" | "doing" | "done";
  createdAt: string;
  updatedAt: string;
  Users?: User[];
  Project?: Project;
  Client?: Client;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: "staff" | "admin";
}

export interface Project {
  id: number;
  name: string;
  status: "todo" | "doing" | "done";
  clientId: number;
}

export interface Client {
  id: number;
  name: string;
  priority: "normal" | "high" | "very high";
}
