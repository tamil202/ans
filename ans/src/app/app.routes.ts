import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/routes/auth.routes'),
  },
  {
    path: 'home',
    loadChildren: () => import('./data/router/data.routes'),
  },
];
