import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth';

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() || router.createUrlTree(['/login']);
};
