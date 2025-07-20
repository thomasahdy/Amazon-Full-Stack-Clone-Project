import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../core/Services/wishlist.service';
import { Wishlist } from '../../core/interfaces/wishlist';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  // templateUrl: './wishlist.html',
  // styleUrls: ['./wishlist.css']
  template: `
    <div style="background: #ffe0e0; padding: 16px; text-align: center;">
      <strong>DEBUG: Inline Wishlist template is working!</strong>
    </div>
    <div *ngIf="wishlist && wishlist.products.length > 0">
      <h2>Your Wishlist</h2>
      <ul>
        <li *ngFor="let item of wishlist.products">
          {{ item.product_name || item }}
        </li>
      </ul>
    </div>
    <div *ngIf="!wishlist || wishlist.products.length === 0" style="color:#d32f2f;">Your wishlist is empty.</div>
  `
})
export class WishlistComponent implements OnInit {
  wishlist: Wishlist = { _id: '', userId: '', products: [] };
  private wishlistService = inject(WishlistService);

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe({
      next: (wishlist) => this.wishlist = wishlist,
      error: (err) => this.wishlist = { _id: '', userId: '', products: [] }
    });
  }
} 