import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/Services/product.service';
import { Product } from '../../core/interfaces/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {
  products: Product[] = [];
  selectedProduct: Product = this.emptyProduct();
  editMode: boolean = false;
  showForm: boolean = false;
  loading: boolean = false;
  error: string = '';
  private productService = new ProductService(null as any); 

  constructor() {
    this.productService = (window as any).injector?.get(ProductService) || this.productService;
    this.loadProducts();
  }

  emptyProduct(): Product {
    return {
      _id: '', product_name: '', product_id: '', category: [], discounted_price: 0, actual_price: 0, discount_percentage: 0, rating: 0, ratingCount: 0, about: '', img_link: ''
    };
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => { this.products = products; this.loading = false; },
      error: () => { this.products = []; this.loading = false; this.error = 'Failed to load products.'; }
    });
  }

  addProduct() {
    this.selectedProduct = this.emptyProduct();
    this.editMode = false;
    this.showForm = true;
  }

  editProduct(product: Product) {
    this.selectedProduct = { ...product, category: [...product.category] };
    this.editMode = true;
    this.showForm = true;
  }

  deleteProduct(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.loading = true;
      this.productService.deleteProduct(product._id).subscribe({
        next: () => { this.loadProducts(); this.loading = false; },
        error: () => { this.loading = false; this.error = 'Failed to delete product.'; }
      });
    }
  }

  saveProduct() {
    
    if (typeof this.selectedProduct.category === 'string') {
      this.selectedProduct.category = (this.selectedProduct.category as string).split(',').map(c => c.trim());
    }
    this.loading = true;
    if (this.editMode) {
      this.productService.updateProduct(this.selectedProduct._id, this.selectedProduct).subscribe({
        next: () => { this.showForm = false; this.loadProducts(); this.loading = false; },
        error: () => { this.loading = false; this.error = 'Failed to update product.'; }
      });
    } else {
      this.productService.addProduct(this.selectedProduct).subscribe({
        next: () => { this.showForm = false; this.loadProducts(); this.loading = false; },
        error: () => { this.loading = false; this.error = 'Failed to add product.'; }
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.selectedProduct = this.emptyProduct();
    this.editMode = false;
  }
} 