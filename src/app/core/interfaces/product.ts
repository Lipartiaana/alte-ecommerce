export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  inStock: boolean;
  images: string[];
  colorId: string;
  size: string;
  reviews: {
    stars: number;
    count: number;
  };
  categoryId: string;
}
