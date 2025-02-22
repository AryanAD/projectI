export type User = {
  token: string;
  id: number;
  username: string;
  image: string;
  phone: string;
  email: string;
  role: "staff" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserPayload = {
  id: number | string;
  username: string;
  phone: string;
  email: string;
  image?: string;
};

export type UploadImageResponse = {
  message: string;
  image: string;
};

export type RegisterOrUpdatePayload = {
  username?: string;
  email?: string;
  phone?: string;
  role?: string;
  password?: string;
  image?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
