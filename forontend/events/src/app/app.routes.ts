import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/events', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('./components/events/event-list/event-list.component').then(m => m.EventListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'events/:id',
    loadComponent: () => import('./components/events/event-details/event-details.component').then(m => m.EventDetailsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '**',
    redirectTo: '/events'
  }
];
