import { Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrdersComponent } from './orders/orders.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { ProfileComponent } from './profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { authGuard } from '../../core/guards';
import { CartComponent } from './cart/cart.component';

export const profileRoutes: Routes = [
  {
    path: 'cart',
    canActivate: [authGuard],
    component: CartComponent,
  },
  {
    path: '',
    component: ProfileComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'myProfile',
        pathMatch: 'full',
      },
      {
        path: 'orders',
        component: OrdersComponent,
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
