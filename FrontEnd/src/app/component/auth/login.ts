import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  error = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.error = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          // Optionally store user info
          this.router.navigate(['/products']);
        } else {
          this.error = res.message || 'Login failed.';
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed.';
      }
    });
  }
} 