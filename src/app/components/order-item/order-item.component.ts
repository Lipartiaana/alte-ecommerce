import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from '../../core/interfaces/order';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'alte-order-item',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  @Input() product: Product = {} as Product;
}
