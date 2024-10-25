export interface Project {
  id: number;
  name: string;
  details: string;
  categoryId: number;
  status: "todo" | "doing" | "done";
  deadline: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: number;
  name: string;
}
