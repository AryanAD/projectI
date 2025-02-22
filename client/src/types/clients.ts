export type Client = {
  ClientCategory: Category;
  id: number;
  name: string;
  details: string;
  logo?: string;
  email: string;
  phone: string;
  location: string;
  priority: "normal" | "high" | "very high";
  startDate: string;
  endDate: string;
  createdAt?: string;
  updatedAt?: string;
  categoryId: number;
};

export type Category = {
  id: number;
  name: string;
};

export type AddOrModifyPayload = {
  name?: string;
  details?: string;
  logo?: string;
  email?: string;
  phone?: string;
  location?: string;
  priority?: string;
  startDate?: string;
  endDate?: string;
  categoryId?: number;
};

export type UploadLogoResponse = {
  message: string;
  image: string;
};
