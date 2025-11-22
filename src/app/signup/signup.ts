import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  router = inject(Router);
  auth = inject(AuthService);

  user = { name: '', email: '', password: '', confirmPassword: '' };
  submitted = false;
  success = false;

  onSubmit() {
    this.submitted = true;
    if (!this.user.name || !this.user.email || this.user.password !== this.user.confirmPassword)
      return;

    // FAKE LOGIN — THIS IS ALL YOU NEED
    localStorage.setItem('auth_token', 'fake-jwt'); // ← this logs them in
    this.auth['isLoggedIn'].set(true); // ← force signal update

    this.success = true;
    setTimeout(() => {
      this.router.navigate(['/']); // ← GOES STRAIGHT TO DASHBOARD
    }, 2000);
  }

  get passwordMismatch() {
    return this.submitted && this.user.password !== this.user.confirmPassword;
  }
}
