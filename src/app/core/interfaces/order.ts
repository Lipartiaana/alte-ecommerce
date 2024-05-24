import { Product } from './product';
import { User } from './user';

export interface Order {
  userId: string;
  user: User;
  products: Product[];
  total: number;
  status: 'pending' | 'completed' | 'canceled';
  createdAt: Date;
  shipping: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    email: string;
    fullName: string;
  };
}
