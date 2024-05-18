import { Size } from '../types/size.type';
import { Category } from './category';
import { Color } from './color';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  inStock: boolean;
  images: string[];
  colorId: string;
  size: Size;
  reviews: Review;
  categoryId: string;
  cover?: string;
  category: Category;
  color: Color;
}

export interface Review {
  stars: number;
  count: number;
}
