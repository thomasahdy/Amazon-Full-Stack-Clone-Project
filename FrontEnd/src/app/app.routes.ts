import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/Services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', loadComponent: () => import('./component/product-list/product-list').then(m => m.ProductList) },
  { path: 'product/:id', loadComponent: () => import('./component/product-detail/product-detail').then(m => m.ProductDetail) },
  { path: 'cart', loadComponent: () => import('./component/cart/cart').then(m => m.CartComponent), canActivate: [authGuard] },
  { path: 'wishlist', loadComponent: () => import('./component/wishlist/wishlist').then(m => m.WishlistComponent), canActivate: [authGuard] },
  { path: 'orders', loadComponent: () => import('./component/orders/orders').then(m => m.Orders), canActivate: [authGuard] },
  { path: 'login', loadComponent: () => import('./component/auth/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./component/auth/register').then(m => m.Register) },
  { path: 'admin', loadComponent: () => import('./component/admin/admin').then(m => m.Admin), canActivate: [adminGuard] },
  { path: '**', redirectTo: 'products' }
];
