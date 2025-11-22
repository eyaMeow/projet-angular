import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Layout } from './layout/layout';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  {
    path: '',
    component: Layout,
    canMatch: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'users',
        loadComponent: () => import('./users/users').then((m) => m.Users),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings').then((m) => m.Settings),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
