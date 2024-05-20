import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../facades';
import { CategoryFacade } from '../../facades/category.facade';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartFacade } from '../../facades/cart.facade';
import { filter, map } from 'rxjs';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'alte-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    ButtonComponent,
    RouterLink,
    CdkMenuTrigger,
    AsyncPipe,
    CurrencyPipe,
  ],
})
export class HeaderComponent {
  authFacade = inject(AuthFacade);
  categoryFacade = inject(CategoryFacade);
  categories$ = this.categoryFacade.getCategories();
  cartFacade = inject(CartFacade);

  cartCount$ = this.cartFacade.cart$.pipe(
    map((cart) =>
      cart
        .filter((item) => item?.quantity && item.quantity > 0)
        .reduce((acc, item) => acc + item.quantity * item.price, 0)
    )
  );

  get user() {
    return this.authFacade.user;
  }

  get isAuthenticated() {
    return this.authFacade.isAuthenticated;
  }

  logout() {
    this.authFacade.logout();
  }
}
