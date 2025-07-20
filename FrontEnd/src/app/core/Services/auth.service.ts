import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(user: Partial<User> & { password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, user);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    // Optionally decode the token to check for admin role
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role === 'admin';
    } catch {
      return false;
    }
  }
} 