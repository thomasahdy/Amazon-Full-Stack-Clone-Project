export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  role: 'user' | 'admin';
} 