import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FirebaseDocument } from '../interfaces/firebase-document';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ApiService {
  getProducts() {
    return this.get<FirebaseDocument<Product>[]>('product.json');
  }

  geyProduct(id: string) {
    return this.get<FirebaseDocument<Product>>(`products/${id}.json`);
  }
}
