import { Component, inject } from '@angular/core';
import { WishlistFacade } from '../../../facades/wishlist.facade';
import { AsyncPipe } from '@angular/common';
import { ProductItemComponent } from '../../../components/product-item/product-item.component';
import { Wishlist } from '../../../core/interfaces/wishlist';

@Component({
  selector: 'alte-wishlist',
  standalone: true,
  imports: [AsyncPipe, ProductItemComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  wishlistFacade = inject(WishlistFacade);

  wishlists$ = this.wishlistFacade.getWishlists();

  deleteWishlist(wishlist: Wishlist) {
    if (!wishlist.id) {
      return;
    }

    this.wishlistFacade.removeWishlist(wishlist.id).subscribe(() => {
      this.wishlists$ = this.wishlistFacade.getWishlists();
    });
  }
}
