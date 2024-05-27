import { Component, inject } from '@angular/core';
import { OrderItemComponent } from '../../../components/order-item/order-item.component';
import { OrderFacade } from '../../../facades/order.facade';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderStatusPipe } from '../../../core/pipes/order-status.pipe';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'alte-orders',
  standalone: true,
  imports: [
    OrderItemComponent,
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    OrderStatusPipe,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orderFacade = inject(OrderFacade);

  orders$ = this.orderFacade.getOrders();
}
