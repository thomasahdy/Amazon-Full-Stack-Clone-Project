import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  addToCart(productId: string, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/add`, { productId, quantity });
  }

  updateCartItem(productId: string, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/update/${productId}`, { quantity });
  }

  removeFromCart(productId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/remove/${productId}`);
  }

  clearCart(): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/clear`);
  }
} 