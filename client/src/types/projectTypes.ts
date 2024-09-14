export interface Project {
  id: number;
  name: string;
  details: string;
  category: string;
  status: "todo" | "doing" | "done";
  createdAt?: Date;
  updatedAt?: Date;
}
