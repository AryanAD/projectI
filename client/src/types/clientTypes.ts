export interface Client {
  id: number;
  name: string;
  details: string;
  category: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}
