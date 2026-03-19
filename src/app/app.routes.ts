import { Routes } from '@angular/router';
import { Dashboard } from './ui/pages/dashboard/dashboard';
import { HistoryPage } from './ui/pages/history/history';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'historial',
    component: HistoryPage,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
