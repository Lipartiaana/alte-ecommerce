import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { FirebaseDocument } from '../core/interfaces/firebase-document';
import { Wishlist } from '../core/interfaces/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService extends ApiService {
  getWishlists(userId: string) {
    return this.get<FirebaseDocument<Wishlist>[]>('wishlists.json', {
      orderBy: '"userId"',
      equalTo: `"${userId}"`,
    });
  }

  getWishlistById(id: string) {
    return this.get<FirebaseDocument<Wishlist>>(`wishlists/${id}.json`);
  }

  addWishlist(wishlist: Wishlist) {
    return this.post<FirebaseDocument<any>>('wishlists.json', wishlist);
  }

  removeWislist(id: string) {
    return this.delete(`wishlists/${id}.json`);
  }
}
