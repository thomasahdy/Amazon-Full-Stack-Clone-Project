import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../core/interfaces/product';
import { ProductService } from '../../core/Services/product.service';

function hasProductsProp(obj: unknown): obj is { products: Product[] } {
  return typeof obj === 'object' && obj !== null && Array.isArray((obj as any).products);
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);

  constructor() {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (res: Product[] | { products: Product[] }) => {
        if (Array.isArray(res)) {
          this.products = res as Product[];
        } else if (hasProductsProp(res)) {
          this.products = res.products;
        } else {
          this.products = [];
        }
      },
      error: (err: any) => console.error('Failed to load products', err)
    });
  }
} 