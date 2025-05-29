import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Event } from '../../interfaces/event.interface';
import { CreateEventDialogComponent } from './create-event-dialog/create-event-dialog.component';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  events: Event[] = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: new Date('2024-07-15'),
      location: 'Central Park',
      category: 'Music',
      price: 49.99,
      image: 'assets/images/music-festival.jpg',
      description: 'Join us for an amazing summer music festival!',
      capacity: 1000,
      availableTickets: 750
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      date: new Date('2024-06-20'),
      location: 'Convention Center',
      category: 'Technology',
      price: 299.99,
      image: 'assets/images/tech-conf.jpg',
      description: 'Explore the latest innovations in technology.',
      capacity: 500,
      availableTickets: 300
    }
  ];

  displayedColumns: string[] = [
    'id',
    'title',
    'date',
    'location',
    'category',
    'price',
    'capacity',
    'availableTickets',
    'actions'
  ];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // In a real app, fetch events from a service
  }

  createEvent(): void {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // In a real app, this would be handled by a service
        this.events = [...this.events, result];
        this.snackBar.open('Event created successfully', 'Close', {
          duration: 3000
        });
      }
    });
  }

  editEvent(event: Event): void {
    // TODO: Implement edit dialog
    this.snackBar.open('Edit event coming soon!', 'Close', {
      duration: 3000
    });
  }

  deleteEvent(eventId: number): void {
    // In a real app, this would call an API
    this.events = this.events.filter(e => e.id !== eventId);
    this.snackBar.open('Event deleted successfully', 'Close', {
      duration: 3000
    });
  }

  viewDetails(event: Event): void {
    // TODO: Implement view details dialog
    this.snackBar.open('View details coming soon!', 'Close', {
      duration: 3000
    });
  }
} 