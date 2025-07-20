import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  name = '';
  email = '';
  password = '';
  age: number | undefined = undefined;
  error = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.error = '';
    const ageToSend = this.age === undefined || this.age === null ? undefined : this.age;
    this.authService.register({ name: this.name, email: this.email, password: this.password, age: ageToSend }).subscribe({
      next: (res) => {
        // Registration successful, redirect to login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed.';
      }
    });
  }
} 