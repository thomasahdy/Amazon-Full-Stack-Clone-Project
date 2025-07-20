export interface Product {
  _id: string;
  product_name: string;
  product_id: string;
  category: string[];
  discounted_price: number;
  actual_price: number;
  discount_percentage: number;
  rating: number;
  ratingCount: number;
  about: string;
  img_link: string;
} 