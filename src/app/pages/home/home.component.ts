import { Component } from '@angular/core';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { FeatureCardComponent } from '../../components/feature-card/feature-card.component';
import { FEATURES } from '../../data/features';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { BESTSELLERS } from '../../data/bestselers';

@Component({
  selector: 'alte-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HeroBannerComponent, FeatureCardComponent, ProductCardComponent],
})
export class HomeComponent {
  features = FEATURES;
  bestsellers = BESTSELLERS;
}
