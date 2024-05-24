import { Component, OnDestroy, inject } from '@angular/core';
import { AuthHeadComponent } from '../../auth/auth-head/auth-head.component';
import { KeyValueComponent } from '../../../components/key-value/key-value.component';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { CartFacade } from '../../../facades/cart.facade';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { ButtonComponent } from '../../../ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../components/input/input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderFacade } from '../../../facades/order.facade';
import { Order } from '../../../core/interfaces/order';
import { AuthFacade } from '../../../facades';

@Component({
  selector: 'alte-checkout',
  standalone: true,
  imports: [
    AuthHeadComponent,
    KeyValueComponent,
    AsyncPipe,
    CurrencyPipe,
    ButtonComponent,
    RouterLink,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnDestroy {
  cartFacade = inject(CartFacade);
  orderFacade = inject(OrderFacade);
  authFacade = inject(AuthFacade);
  router = inject(Router);

  sub$ = new Subject();

  total = 0;

  sum$ = this.cartFacade.cart$.pipe(
    map((cart) =>
      cart
        .filter((item) => item?.quantity && item.quantity > 0)
        .reduce(
          (acc, item) =>
            acc +
            item.quantity * item.price +
            item.quantity * item.price * this.cartFacade.feePercentage,
          0
        )
    ),
    tap((sum: number) => (this.total = sum))
  );

  carts$: Observable<
    {
      cover: string | undefined;
      id: string;
    }[]
  > = this.cartFacade.cart$.pipe(
    map((cart) => cart.map((item) => ({ cover: item.cover, id: item.id })))
  );

  form = new FormGroup({
    address: new FormControl<string>('', Validators.required),
    city: new FormControl<string>('', Validators.required),
    state: new FormControl<string>('', Validators.required),
    zipCode: new FormControl<string>('', Validators.required),
    country: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    fullName: new FormControl<string>('', Validators.required),
  });

  checkout() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const order: Order = {
      userId: this.authFacade.user.id,
      user: this.authFacade.user,
      products: this.cartFacade.allProducts,
      total: this.total,
      status: 'pending',
      createdAt: new Date(),
      shipping: this.form.value as any,
    };

    this.orderFacade
      .createOrder(order)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        console.log('Order created:', res);
        this.cartFacade.setToLocalStorage([]);
        this.router.navigate(['/profile/success-order']);
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
