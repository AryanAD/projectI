export interface User {
  id: number;
  username: string;
  image: string;
  phone: string;
  email: string;
  role: "staff" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
