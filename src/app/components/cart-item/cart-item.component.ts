import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { QuantityInputComponent } from '../quantity-input/quantity-input.component';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'alte-cart-item',
  standalone: true,
  imports: [CurrencyPipe, QuantityInputComponent, ButtonComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() product: Product = {} as Product;
  @Output() remove = new EventEmitter<Product>();
  @Output() update = new EventEmitter<{
    product: Product;
    quantity: number;
  }>();
}
