import { Injectable, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs';
import { Product } from '../core/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  productService = inject(ProductService);

  getProducts() {
    return this.productService.getProducts().pipe(
      map((products) => {
        return Object.keys(products).map(
          (key: any) =>
            ({
              ...products[key],
              id: key,
            } as Product)
        );
      })
    );
  }

  getProductsById(id: string) {
    return this.productService.getProduct(id).pipe(
      map(
        (product) =>
          ({
            ...product,
            id,
          } as Product)
      )
    );
  }
}
