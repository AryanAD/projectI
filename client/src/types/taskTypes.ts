export type Id = number;

export interface Task {
  id: number;
  columnId: number;
  content: string;
  status: "todo" | "doing" | "done";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Column {
  id: number | string;
  title: string;
}
