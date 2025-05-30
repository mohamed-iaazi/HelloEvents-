import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Event, EventService } from '../../services/event.service';
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
  events: Event[] = [];
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
    private eventService: EventService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        this.snackBar.open('Error loading events', 'Close', { duration: 3000 });
        console.error('Error loading events:', error);
      }
    });
  }

  createEvent(): void {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.createEvent(result).subscribe({
          next: () => {
            this.loadEvents();
            this.snackBar.open('Event created successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('Error creating event', 'Close', { duration: 3000 });
            console.error('Error creating event:', error);
          }
        });
      }
    });
  }

  editEvent(event: Event): void {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '600px',
      data: event,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.updateEvent(event.id!, result).subscribe({
          next: () => {
            this.loadEvents();
            this.snackBar.open('Event updated successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            this.snackBar.open('Error updating event', 'Close', { duration: 3000 });
            console.error('Error updating event:', error);
          }
        });
      }
    });
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.loadEvents();
          this.snackBar.open('Event deleted successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Error deleting event', 'Close', { duration: 3000 });
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  viewDetails(event: Event): void {
    // TODO: Implement view details dialog
    this.snackBar.open('View details coming soon!', 'Close', { duration: 3000 });
  }
} 