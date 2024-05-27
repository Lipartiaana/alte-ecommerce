import { Injectable, inject } from '@angular/core';
import { Order } from '../core/interfaces/order';
import { AuthFacade } from './auth.facade';
import { map, throwError } from 'rxjs';
import { FirebaseDocument } from '../core/interfaces/firebase-document';
import { WishlistService } from '../services/wishlist.service';
import { Wishlist } from '../core/interfaces/wishlist';
import { Product } from '../core/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class WishlistFacade {
  wishlistService = inject(WishlistService);
  authFacade = inject(AuthFacade);

  getWishlists() {
    return this.wishlistService.getWishlists(this.authFacade.user.id).pipe(
      map((wishlists) => {
        return Object.keys(wishlists).map(
          (key: any) =>
            ({
              ...wishlists[key],
              id: key,
            } as Wishlist)
        );
      })
    );
  }

  getwishlistById(id: string) {
    return this.wishlistService.getWishlistById(id).pipe(
      map(
        (wishlist: FirebaseDocument<Wishlist>) =>
          ({
            ...wishlist,
            id,
          } as Wishlist)
      )
    );
  }

  addWishlist(product: Product) {
    if (!this.authFacade.isAuthenticated) {
      return throwError(() => new Error('User is not authenticated'));
    }

    const wishlist: Wishlist = {
      product,
      userId: this.authFacade.user.id,
    };
    return this.wishlistService.addWishlist(wishlist);
  }

  removeWishlist(id: string) {
    return this.wishlistService.removeWislist(id);
  }
}
