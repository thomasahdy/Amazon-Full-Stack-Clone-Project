import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/Services/cart.service';
import { Cart } from '../../core/interfaces/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cart: Cart = { _id: '', userId: '', products: [] };
  private cartService = inject(CartService);

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (cart) => this.cart = cart,
      error: (err) => this.cart = { _id: '', userId: '', products: [] }
    });
  }
} 