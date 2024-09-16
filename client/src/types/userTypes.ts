export interface User {
  id: number;
  username: string;
  email: string;
  role: "staff" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
