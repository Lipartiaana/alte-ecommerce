import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Order } from '../core/interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends ApiService {
  getOrders() {
    return this.get('orders.json');
  }

  getOrderById(id: string) {
    return this.get(`orders/${id}.json`);
  }

  createOrder(order: Order) {
    return this.post('orders.json', order);
  }
}
