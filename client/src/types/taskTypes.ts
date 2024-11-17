export type Id = number | string;

export interface Task {
  id: number;
  columnId: number | string;
  content: string;
  status: "todo" | "doing" | "done";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Column {
  id: number | string;
  title: string;
}
