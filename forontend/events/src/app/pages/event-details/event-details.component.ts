import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'app-event-details',
  standalone: true,
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class EventDetailsComponent implements OnInit {
  event: Event | undefined;
  ticketsToBook: number = 1;

  // Temporary data - in a real app, this would come from a service
  private tempEvent: Event = {
    id: 1,
    title: 'Summer Music Festival',
    date: new Date('2024-07-15'),
    location: 'Central Park',
    category: 'Music',
    price: 49.99,
    image: 'assets/images/music-festival.jpg',
    description: 'Join us for an amazing summer music festival featuring top artists! Experience live performances from world-renowned musicians across multiple stages. Enjoy food vendors, art installations, and interactive experiences throughout the festival grounds. Don\'t miss this unforgettable celebration of music and community.',
    capacity: 1000,
    availableTickets: 750
  };

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // In a real app, we would fetch the event data from a service
    // using the ID from the route params
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.event = this.tempEvent; // Temporary: just using our mock data
    });
  }

  bookEvent() {
    if (this.event && this.event.availableTickets && this.event.availableTickets > 0) {
      // In a real app, this would make an API call to book tickets
      this.event.availableTickets--;
      this.snackBar.open('Booking successful! Check your email for confirmation.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  getAvailabilityColor(): string {
    if (!this.event?.availableTickets) return 'warn';
    if (this.event.availableTickets < 50) return 'warn';
    if (this.event.availableTickets < 200) return 'accent';
    return 'primary';
  }
} 