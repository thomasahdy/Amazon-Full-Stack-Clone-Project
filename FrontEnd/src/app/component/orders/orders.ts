import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../core/Services/order.service';
import { Order } from '../../core/interfaces/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class Orders implements OnInit {
  orders: Order[] = [];
  private orderService = inject(OrderService);

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (orders) => this.orders = orders,
      error: (err) => this.orders = []
    });
  }
} 