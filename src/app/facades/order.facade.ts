import { Injectable, inject } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../core/interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderFacade {
  orderService = inject(OrderService);

  getOrders() {
    return this.orderService.getOrders();
  }

  getOrderById(id: string) {
    return this.orderService.getOrderById(id);
  }

  createOrder(order: Order) {
    return this.orderService.createOrder(order);
  }
}
