// src/app/auth/auth.guard.spec.ts

import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { authGuard } from './auth-guard';
import { AuthService } from './auth';

describe('authGuard', () => {
  let mockAuthService: { isAuthenticated: jasmine.Spy };
  let mockRouter: { createUrlTree: jasmine.Spy };

  const executeGuard = () => TestBed.runInInjectionContext(authGuard);

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(false),
    };

    mockRouter = {
      createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue(new UrlTree()),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access when authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(true);

    const result = executeGuard();

    expect(result).toBeTrue();
  });

  it('should redirect to login when NOT authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(false);

    const result = executeGuard();

    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).toBeInstanceOf(UrlTree);
  });
});
