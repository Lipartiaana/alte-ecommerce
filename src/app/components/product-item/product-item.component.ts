import { Component, Input } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { CurrencyPipe, NgIf } from '@angular/common';
import { StockPipe } from '../../core/pipes/stock.pipe';

@Component({
  selector: 'alte-product-item',
  standalone: true,
  imports: [CurrencyPipe, StockPipe, NgIf],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product: Product | undefined;
}
