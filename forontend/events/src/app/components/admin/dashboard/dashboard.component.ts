import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <h1>Admin Dashboard</h1>
      
      <div class="dashboard-grid">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Events Management</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Manage all events, create new events, and handle event details.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/events">Manage Events</button>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>User Management</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Manage user accounts, roles, and permissions.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">Manage Users</button>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Bookings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>View and manage event bookings and tickets.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">View Bookings</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      color: white;
    }

    h1 {
      margin-bottom: 2rem;
      text-align: center;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }

    mat-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    mat-card-title {
      color: white;
    }

    mat-card-content {
      color: rgba(255, 255, 255, 0.8);
      margin: 1rem 0;
    }

    mat-card-actions {
      padding: 1rem;
      display: flex;
      justify-content: center;
    }
  `]
})
export class DashboardComponent {} 