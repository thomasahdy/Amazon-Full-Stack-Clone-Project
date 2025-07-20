import { Product } from './product';

export interface OrderItem {
  productId: Product;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export {} // Ensure this file is a module 