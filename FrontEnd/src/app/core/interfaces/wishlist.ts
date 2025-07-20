import { Product } from './product';

export interface Wishlist {
  _id: string;
  userId: string;
  products: Product[];
} 