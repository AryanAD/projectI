export interface User {
  id: number | string;
  username: string;
  image: string;
  phone: string;
  email: string;
  role: "staff" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
