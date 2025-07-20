import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../core/Services/product.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
  
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product: Product) => this.product = product,
        error: (err: any) => this.product = null
      });
    }
  }

  addToCart() {
    alert('Add to Cart clicked! (implement logic)');
  }
  addToWishlist() {
    alert('Add to Wishlist clicked! (implement logic)');
  }
} 