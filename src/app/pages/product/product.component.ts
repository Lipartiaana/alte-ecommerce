import { Component, OnDestroy, Sanitizer, inject } from '@angular/core';
import {
  Observable,
  Subject,
  map,
  mergeMap,
  share,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { ProductFacade } from '../../facades/product.facade';
import { CategoryFacade } from '../../facades/category.facade';
import { ColorFacade } from '../../facades/color.facade';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { Product } from '../../core/interfaces/product';
import { ReviewComponent } from '../../components/review/review.component';
import { StockCheckComponent } from '../../components/stock-check/stock-check.component';
import { ColorItemComponent } from '../../components/color-item/color-item.component';
import { SizeItemComponent } from '../../components/size-item/size-item.component';
import { QuantityInputComponent } from '../../components/quantity-input/quantity-input.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { CartFacade } from '../../facades/cart.facade';
import { WishlistFacade } from '../../facades/wishlist.facade';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'alte-product',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    BreadcrumbComponent,
    ReviewComponent,
    NgIf,
    StockCheckComponent,
    CurrencyPipe,
    ColorItemComponent,
    SizeItemComponent,
    QuantityInputComponent,
    ButtonComponent,
    ProductItemComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnDestroy {
  route = inject(ActivatedRoute);
  productFacade = inject(ProductFacade);
  categoryFacade = inject(CategoryFacade);
  colorFacade = inject(ColorFacade);
  cartFacade = inject(CartFacade);
  wishlistFacade = inject(WishlistFacade);
  sanitizer = inject(DomSanitizer);

  quantity: number = 1;

  sub$ = new Subject();

  product$ = this.route.params.pipe(
    switchMap((params: any) =>
      this.productFacade.getProduct(params['id']).pipe(
        map((product: Product) => {
          let cover;
          if (product.images && product.images.length) {
            cover = product.images[0];
          }
          return {
            ...product,
            cover,
          };
        }),
        mergeMap((product) =>
          this.categoryFacade
            .getCategoryById(product.categoryId)
            .pipe(map((category) => ({ ...product, category })))
        ),
        mergeMap((productWithCategory) =>
          this.colorFacade.getColorById(productWithCategory.colorId).pipe(
            map((color) => ({
              ...productWithCategory,
              color,
            }))
          )
        )
      )
    )
  );

  relatedProducts$: Observable<Product[]> = this.product$.pipe(
    switchMap((product: Product) =>
      this.productFacade.getRelatedProducts(product.categoryId, product.id)
    )
  );

  addToCart(product: Product) {
    this.cartFacade.addToCrat(product, this.quantity);
  }

  addToWishList(product: Product) {
    this.wishlistFacade
      .addWishlist(product)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        console.log(res);
        alert('Product added to wishlist');
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
