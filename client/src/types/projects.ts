export type Project = {
  assignedToIds: never[];
  Users: AssignedUser[];
  id: number;
  name: string;
  details: string;
  ProjectCategory: Category;
  categoryId: number;
  status: "todo" | "doing" | "done";
  deadline: string;
  createdAt?: string;
  updatedAt?: string;
};

type AssignedUser = {
  id: number;
  username: string;
};

export type Category = {
  id: number;
  name: string;
};

export type CreateOrUpdatePayload = {
  name?: string;
  details?: string;
  categoryId?: number;
  status?: string;
  deadline?: string;
};
