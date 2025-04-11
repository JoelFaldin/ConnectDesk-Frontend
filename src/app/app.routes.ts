import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component'),
    children: [
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
    redirectTo: 'dashboard'
  }
];
