import { Component, inject } from '@angular/core';
import { AuthHeadComponent } from '../../auth/auth-head/auth-head.component';
import { KeyValueComponent } from '../../../components/key-value/key-value.component';
import { CartFacade } from '../../../facades/cart.facade';
import { map } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ButtonComponent } from '../../../ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { CartItemComponent } from '../../../components/cart-item/cart-item.component';
import { Product } from '../../../core/interfaces/product';

@Component({
  selector: 'alte-cart',
  standalone: true,
  imports: [
    AuthHeadComponent,
    KeyValueComponent,
    AsyncPipe,
    CurrencyPipe,
    ButtonComponent,
    RouterLink,
    CartItemComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartFacade = inject(CartFacade);
  router = inject(Router);

  carts$ = this.cartFacade.cart$;

  sum$ = this.cartFacade.cart$.pipe(
    map((cart) =>
      cart
        .filter((item) => item?.quantity && item.quantity > 0)
        .reduce((acc, item) => acc + item.quantity * item.price, 0)
    )
  );

  removeFromCart(product: Product) {
    this.cartFacade.removeFromCart(product);
  }

  updateToCart($event: { product: Product; quantity: number }) {
    this.cartFacade.updateCart($event.product, $event.quantity);
  }

  checkout() {
    this.router.navigate(['/profile/checkout']);
  }
}
