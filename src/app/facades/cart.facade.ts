import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../core/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  cart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  get allProducts() {
    return this.cart.getValue();
  }

  feePercentage = 0.18;

  constructor() {
    this.cart.next(this.getFromLocalStorage());
  }

  setToLocalStorage(cart: any) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart.next(cart);
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  addToCrat(product: any, qunatity: number = 1) {
    const cart = this.getFromLocalStorage();
    if (cart.find((item: any) => item.id === product.id)) {
      this.updateCart(product, qunatity);
      return;
    }
    this.setToLocalStorage([...cart, product]);
  }

  removeFromCart(product: any) {
    const cart = this.getFromLocalStorage();
    this.setToLocalStorage(cart.filter((item: any) => item.id !== product.id));
  }

  updateCart(product: any, qunatity: number = 1) {
    const cart = this.getFromLocalStorage();
    const updateCart = cart.map((item: any) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: qunatity,
        };
      }
      return item;
    });

    this.setToLocalStorage(updateCart);
  }
}
