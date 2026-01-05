import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { Order } from '../shared/models/Order';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.css'],
})
export class OrderHistoryPageComponent implements OnInit {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllForCurrentUser().subscribe((orders) => {
      this.orders = orders;
    });
  }
}
