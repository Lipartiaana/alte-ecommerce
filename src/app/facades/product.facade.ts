import { Injectable, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs';
import { Product } from '../core/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  productService = inject(ProductService);

  getProducts(params: {
    categoryId: string[];
    colorId?: string;
    size?: string;
  }) {
    return this.productService.getProducts().pipe(
      map((products) => {
        return Object.keys(products).map(
          (key: any) =>
            ({
              ...products[key],
              id: key,
            } as Product)
        );
      }),
      map((products) => {
        return products.filter((product) => {
          if (
            params.categoryId.length &&
            !params.categoryId.includes(product.categoryId)
          ) {
            return false;
          }

          if (params.colorId && params.colorId !== product.colorId) {
            return false;
          }

          if (params.size && params.size !== product.size) {
            return false;
          }

          return true;
        });
      })
    );
  }

  getProduct(id: string) {
    return this.productService.getProduct(id).pipe(
      map((product) => {
        return {
          ...product,
          id,
        } as Product;
      })
    );
  }

  getRelatedProducts(categoryId: string, productId: string) {
    return this.productService.getRelatedProducts(categoryId).pipe(
      map((products) => {
        return Object.keys(products).map(
          (key: any) =>
            ({
              ...products[key],
              id: key,
            } as Product)
        );
      }),
      map((products) => {
        return products
          .filter((product: Product) => product.id !== productId)
          .slice(0, 4);
      })
    );
  }
}
