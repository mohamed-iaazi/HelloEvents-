import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminBookingsComponent } from './admin/admin-bookings/admin-bookings.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { 
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminHomeComponent },
      { path: 'events', component: AdminEventsComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'bookings', component: AdminBookingsComponent }
    ]
  }
];
