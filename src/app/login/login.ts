import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = 'admin';
  password = 'admin';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isAuthenticated()) this.router.navigate(['/']);
  }

  onSubmit() {
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
