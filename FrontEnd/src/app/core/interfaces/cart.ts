import { Product } from './product';

export interface CartProduct {
  productId: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  products: CartProduct[];
} 