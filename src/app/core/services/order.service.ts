import { Injectable, signal } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = signal<Order[]>([
    { id: '1', origin: 'City A', destination: 'City B', assignedBison: '1', cost: 100, status: 'in-progress' },
    { id: '2', origin: 'City C', destination: 'City D', assignedBison: '2', cost: 200, status: 'completed' },
  ]);

  getOrders() {
    return this.orders.asReadonly();
  }
}
