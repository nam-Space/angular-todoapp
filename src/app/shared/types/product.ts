export type IProduct = {
  createdAt?: string;
  name: string;
  image?: string;
  description: string;
  price: string;
  id?: string;
};

export type IProductForm = {
  createdAt: string;
  name: string;
  image?: string;
  description: string;
  price: string;
  id?: string;
  action: string;
};
