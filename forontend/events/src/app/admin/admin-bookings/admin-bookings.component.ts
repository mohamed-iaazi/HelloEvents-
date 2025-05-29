import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Booking } from '../../interfaces/booking.interface';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {
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
    },
    {
      id: 2,
      eventId: 2,
      userId: 2,
      status: 'pending',
      ticketCount: 1,
      totalPrice: 299.99,
      bookingDate: new Date('2024-03-21'),
      userName: 'Jane Smith',
      eventTitle: 'Tech Conference 2024'
    }
  ];

  displayedColumns: string[] = [
    'id',
    'eventTitle',
    'userName',
    'status',
    'ticketCount',
    'totalPrice',
    'bookingDate',
    'actions'
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // In a real app, fetch bookings from a service
  }

  updateStatus(booking: Booking) {
    // TODO: Implement status update dialog
    this.snackBar.open('Status update coming soon!', 'Close', {
      duration: 3000
    });
  }

  deleteBooking(bookingId: number) {
    // In a real app, this would call an API
    const booking = this.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = 'cancelled';
      this.snackBar.open('Booking cancelled successfully', 'Close', {
        duration: 3000
      });
    }
  }

  viewDetails(booking: Booking) {
    // TODO: Implement view details dialog
    this.snackBar.open('Booking details coming soon!', 'Close', {
      duration: 3000
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'primary';
      case 'pending':
        return 'accent';
      case 'cancelled':
        return 'warn';
      default:
        return '';
    }
  }
} 