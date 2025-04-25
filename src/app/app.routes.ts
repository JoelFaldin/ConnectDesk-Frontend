import { Routes } from '@angular/router';

import { authGuard } from './auth.guard';
import LayoutComponent from './pages/layout-component.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component'),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users.component')
      },
      {
        path: 'excel',
        loadComponent: () =>
          import('./pages/excel/excel.component')
      },
      {
        path: 'logs',
        loadComponent: () =>
          import('./pages/logs/logs.component')
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component')
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component')
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component')
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
