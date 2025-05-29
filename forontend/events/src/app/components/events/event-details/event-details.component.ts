import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventService, Event } from '../../../services/event.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="event-details-container" *ngIf="event">
      <mat-card class="event-card">
        <img mat-card-image [src]="event.imageUrl" [alt]="event.title">
        <mat-card-content>
          <div class="event-header">
            <h1>{{ event.title }}</h1>
            <div class="event-actions">
              <button mat-icon-button (click)="shareEvent()">
                <mat-icon>share</mat-icon>
              </button>
            </div>
          </div>

          <div class="event-info">
            <p class="description">{{ event.description }}</p>
            
            <div class="details-grid">
              <div class="detail-item">
                <mat-icon>calendar_today</mat-icon>
                <span>{{ event.date | date:'full' }}</span>
              </div>
              
              <div class="detail-item">
                <mat-icon>location_on</mat-icon>
                <span>{{ event.location }}</span>
              </div>
              
              <div class="detail-item">
                <mat-icon>local_offer</mat-icon>
                <span>{{ event.price | currency }}</span>
              </div>
              
              <div class="detail-item">
                <mat-icon>confirmation_number</mat-icon>
                <span>{{ event.availableTickets }} tickets available</span>
              </div>
            </div>
          </div>

          <div class="booking-section" *ngIf="event.availableTickets > 0">
            <mat-form-field appearance="fill">
              <mat-label>Number of Tickets</mat-label>
              <input matInput type="number" [(ngModel)]="ticketQuantity" min="1" [max]="event.availableTickets">
            </mat-form-field>
            
            <button mat-raised-button color="primary" (click)="bookTickets()" [disabled]="!ticketQuantity">
              Book Tickets
            </button>
          </div>
          
          <div class="sold-out" *ngIf="event.availableTickets === 0">
            <p>Sorry, this event is sold out!</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .event-details-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .event-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
    }

    .event-card img {
      max-height: 500px;
      object-fit: cover;
    }

    .event-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      margin: 0;
      font-size: 2.5rem;
    }

    .description {
      font-size: 1.2rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.8);

      mat-icon {
        color: #64b5f6;
      }
    }

    .booking-section {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sold-out {
      text-align: center;
      padding: 2rem;
      color: #f44336;
      font-size: 1.2rem;
    }

    ::ng-deep {
      .mat-form-field-label {
        color: rgba(255, 255, 255, 0.7) !important;
      }

      .mat-form-field-underline {
        background-color: rgba(255, 255, 255, 0.7) !important;
      }

      .mat-input-element {
        color: white !important;
      }
    }
  `]
})
export class EventDetailsComponent implements OnInit {
  event: Event | null = null;
  ticketQuantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEvent(+eventId);
    } else {
      this.router.navigate(['/events']);
    }
  }

  loadEvent(id: number) {
    this.eventService.getEventById(id).subscribe({
      next: (event) => {
        this.event = event;
      },
      error: (error) => {
        console.error('Error loading event:', error);
        this.snackBar.open('Error loading event details', 'Close', { duration: 5000 });
        this.router.navigate(['/events']);
      }
    });
  }

  bookTickets() {
    if (!this.event || !this.ticketQuantity) return;

    this.eventService.bookTickets(this.event.id, this.ticketQuantity).subscribe({
      next: () => {
        this.snackBar.open('Tickets booked successfully!', 'Close', { duration: 5000 });
        this.loadEvent(this.event!.id); // Reload event to update available tickets
      },
      error: (error) => {
        this.snackBar.open(
          error.error?.message || 'Error booking tickets. Please try again.',
          'Close',
          { duration: 5000 }
        );
      }
    });
  }

  shareEvent() {
    if (navigator.share) {
      navigator.share({
        title: this.event?.title,
        text: this.event?.description,
        url: window.location.href
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      this.snackBar.open('Link copied to clipboard!', 'Close', { duration: 3000 });
    }
  }
} 