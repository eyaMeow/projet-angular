import { Injectable, inject, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { signal } from '@angular/core';
import { delay, of, tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private tokenKey = 'auth_token';

  private getStoredToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false;
  }

  private isLoggedIn = signal(this.getStoredToken());
  isAuthenticated = this.isLoggedIn.asReadonly();

  login(username: string, password: string) {
    const success = username === 'admin' && password === 'admin';

    return of(success).pipe(
      delay(500),
      tap((ok) => {
        if (ok && isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.tokenKey, 'fake-jwt');
        }
        this.isLoggedIn.set(ok);
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
    this.isLoggedIn.set(false);
  }
}
