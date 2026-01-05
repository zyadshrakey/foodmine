import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../../shared/models/Order';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  create(order: Order): Observable<Order> {
    order.id = Math.floor(Math.random() * 100000); // Random ID
    order.createdAt = new Date().toISOString();
    order.status = 'NEW';

    // Get existing orders
    const orders = this.getOrdersFromLocalStorage();
    orders.push(order);
    this.saveOrdersToLocalStorage(orders);

    // Mock API call
    return of(order).pipe(delay(500));
  }

  getAllForCurrentUser(): Observable<Order[]> {
    // In a real app, we would filter by user ID.
    // Here we just return all local orders assuming single user context on this browser
    const orders = this.getOrdersFromLocalStorage();
    // Sort by date desc
    orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return of(orders).pipe(delay(500));
  }

  private getOrdersFromLocalStorage(): Order[] {
    const ordersJson = localStorage.getItem('Orders');
    return ordersJson ? JSON.parse(ordersJson) : [];
  }

  private saveOrdersToLocalStorage(orders: Order[]): void {
    localStorage.setItem('Orders', JSON.stringify(orders));
  }
}
