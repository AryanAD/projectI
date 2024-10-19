export interface Client {
  id: number;
  name: string;
  details: string;
  logo?: string;
  email: string;
  phone: string;
  location: string;
  priority: "normal" | "high" | "very high";
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}
