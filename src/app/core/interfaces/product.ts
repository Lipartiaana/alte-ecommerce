export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  inStock: boolean;
  images: string[];
  colors: string[];
  sizes: string[];
  reviews: {
    stars: number;
    count: number;
  };
  categoryId: string;
}
