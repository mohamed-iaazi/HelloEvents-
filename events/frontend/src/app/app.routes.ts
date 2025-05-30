import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'event/:id', loadComponent: () => import('./pages/event-details/event-details.component').then(m => m.EventDetailsComponent) },
  
  { 
    path: 'admin',
    loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin/admin-home/admin-home.component').then(m => m.AdminHomeComponent) },
      { path: 'events', loadComponent: () => import('./admin/admin-events/admin-events.component').then(m => m.AdminEventsComponent) },
      { path: 'users', loadComponent: () => import('./admin/admin-users/admin-users.component').then(m => m.AdminUsersComponent) },
      { path: 'bookings', loadComponent: () => import('./admin/admin-bookings/admin-bookings.component').then(m => m.AdminBookingsComponent) }
    ]
  },
  { path: '**', redirectTo: 'home' }
];
