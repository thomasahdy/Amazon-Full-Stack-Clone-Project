import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wishlist } from '../interfaces/wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private apiUrl = 'http://localhost:3000/wishlist';

  constructor(private http: HttpClient) {}

  getWishlist(): Observable<Wishlist> {
    return this.http.get<Wishlist>(this.apiUrl);
  }

  addToWishlist(productId: string): Observable<Wishlist> {
    return this.http.post<Wishlist>(`${this.apiUrl}/add`, { productId });
  }

  removeFromWishlist(productId: string): Observable<Wishlist> {
    return this.http.delete<Wishlist>(`${this.apiUrl}/remove/${productId}`);
  }

  clearWishlist(): Observable<Wishlist> {
    return this.http.delete<Wishlist>(`${this.apiUrl}/clear`);
  }
} 