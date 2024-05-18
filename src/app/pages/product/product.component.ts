import { Component, inject } from '@angular/core';
import { map, mergeMap, share, switchMap } from 'rxjs';
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
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  route = inject(ActivatedRoute);
  productFacade = inject(ProductFacade);
  categoryFacade = inject(CategoryFacade);
  colorFacade = inject(ColorFacade);

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
    ),
    share()
  );
}
