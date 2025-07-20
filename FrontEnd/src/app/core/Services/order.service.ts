import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`http://localhost:3000/order/${id}`);
  }

  createOrder(orderData: any): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/order', orderData);
  }
} 