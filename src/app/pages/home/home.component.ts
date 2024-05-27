import { Component, inject } from '@angular/core';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { FEATURES } from '../../data/features';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FeatureCardComponent } from '../../components/feature-card/feature-card.component';
import { Product } from '../../core/interfaces/product';
import { ProductFacade } from '../../facades/product.facade';
import { Observable, switchMap } from 'rxjs';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'alte-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HeroBannerComponent,
    FeatureCardComponent,
    AsyncPipe,
    JsonPipe,
    ProductItemComponent,
    RouterLink,
    ButtonComponent,
  ],
})
export class HomeComponent {
  features = FEATURES;

  productFacade = inject(ProductFacade);

  latestProducts$: Observable<Product[]> = this.productFacade.getBestSelling();
}
