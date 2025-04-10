import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./shared/side-bar/side-bar.component')
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
