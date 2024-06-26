import { Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrdersComponent } from './orders/orders.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { ProfileComponent } from './profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { authGuard } from '../../core/guards';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessOrderComponent } from './success-order/success-order.component';
import { FailOrderComponent } from './fail-order/fail-order.component';

export const profileRoutes: Routes = [
  {
    path: 'cart',
    canActivate: [authGuard],
    component: CartComponent,
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    component: CheckoutComponent,
  },
  {
    path: 'success-order',
    canActivate: [authGuard],
    component: SuccessOrderComponent,
  },
  {
    path: 'fail-order',
    canActivate: [authGuard],
    component: FailOrderComponent,
  },
  {
    path: '',
    component: ProfileComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/order.routes').then((m) => m.orderRoutes),
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: 'address',
        component: AddressComponent,
      },
      {
        path: 'password',
        component: PasswordUpdateComponent,
      },
      {
        path: 'myProfile',
        component: MyProfileComponent,
      },
    ],
  },
];
