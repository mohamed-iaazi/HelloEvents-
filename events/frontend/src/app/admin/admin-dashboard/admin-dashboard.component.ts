import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Event } from '../../interfaces/event.interface';
import { User, UserActivity } from '../../interfaces/user.interface';
import { Booking } from '../../interfaces/booking.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  isMobile = false;
  private destroy$ = new Subject<void>();

  // Mock data - in a real app, this would come from a service
  users: User[] = [
    {
      id: 1,
      email: 'user@example.com',
      name: 'John Doe',
      role: 'user',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-03-20')
    }
  ];

  activities: UserActivity[] = [
    {
      id: 1,
      userId: 1,
      type: 'booking',
      timestamp: new Date('2024-03-20'),
      details: 'Booked 2 tickets for Summer Music Festival'
    }
  ];

  bookings: Booking[] = [
    {
      id: 1,
      eventId: 1,
      userId: 1,
      status: 'confirmed',
      ticketCount: 2,
      totalPrice: 99.98,
      bookingDate: new Date('2024-03-20'),
      userName: 'John Doe',
      eventTitle: 'Summer Music Festival'
    }
  ];

  displayedUserColumns: string[] = ['id', 'name', 'email', 'createdAt', 'lastLogin', 'actions'];
  displayedBookingColumns: string[] = ['id', 'eventTitle', 'userName', 'status', 'ticketCount', 'totalPrice', 'bookingDate'];
  displayedActivityColumns: string[] = ['timestamp', 'type', 'details'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deleteUser(userId: number) {
    // In a real app, this would call an API
    this.users = this.users.filter(user => user.id !== userId);
  }

  getTotalRevenue(): number {
    return this.bookings
      .filter(booking => booking.status === 'confirmed')
      .reduce((total, booking) => total + booking.totalPrice, 0);
  }

  getTotalBookings(): number {
    return this.bookings.filter(booking => booking.status === 'confirmed').length;
  }

  getTotalUsers(): number {
    return this.users.length;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 