import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(params?: any): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.apiUrl, { params }).pipe(
      map(res => res.products)
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}

export {} // Ensure this file is a module 