import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { EventService, Event, EventQueryParams } from '../../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  template: `
    <div class="events-container">
      <div class="filters">
        <mat-form-field appearance="fill">
          <mat-label>Search</mat-label>
          <input matInput [(ngModel)]="filters.search" (ngModelChange)="onFiltersChange()">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Category</mat-label>
          <mat-select [(ngModel)]="filters.category" (ngModelChange)="onFiltersChange()">
            <mat-option>All</mat-option>
            <mat-option value="CONCERT">Concert</mat-option>
            <mat-option value="SPORTS">Sports</mat-option>
            <mat-option value="THEATER">Theater</mat-option>
            <mat-option value="CONFERENCE">Conference</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>From Date</mat-label>
          <input matInput [matDatepicker]="fromPicker" [(ngModel)]="filters.fromDate" (ngModelChange)="onFiltersChange()">
          <mat-datepicker-toggle matSuffix [for]="fromPicker"></mat-datepicker-toggle>
          <mat-datepicker #fromPicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>To Date</mat-label>
          <input matInput [matDatepicker]="toPicker" [(ngModel)]="filters.toDate" (ngModelChange)="onFiltersChange()">
          <mat-datepicker-toggle matSuffix [for]="toPicker"></mat-datepicker-toggle>
          <mat-datepicker #toPicker></mat-datepicker>
        </mat-form-field>
      </div>

      <div class="events-grid">
        @for (event of events; track event.id) {
          <mat-card class="event-card">
            <img mat-card-image [src]="event.imageUrl" [alt]="event.title">
            <mat-card-content>
              <h3>{{ event.title }}</h3>
              <p class="description">{{ event.description }}</p>
              <p class="details">
                <span class="date">{{ event.date | date }}</span>
                <span class="location">{{ event.location }}</span>
              </p>
              <p class="price">{{ event.price | currency }}</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" [routerLink]="['/events', event.id]">
                View Details
              </button>
            </mat-card-actions>
          </mat-card>
        } @empty {
          <p class="no-events">No events found matching your criteria.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .events-container {
      padding: 2rem;
      color: white;
    }

    .filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 1rem;
      border-radius: 10px;
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .event-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .event-card img {
      height: 200px;
      object-fit: cover;
    }

    mat-card-content {
      padding: 1rem;
    }

    h3 {
      color: white;
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
    }

    .description {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .details {
      display: flex;
      justify-content: space-between;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 0.5rem;
    }

    .price {
      color: #64b5f6;
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0;
    }

    mat-card-actions {
      padding: 1rem;
      display: flex;
      justify-content: center;
    }

    .no-events {
      grid-column: 1 / -1;
      text-align: center;
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.7);
    }

    ::ng-deep {
      .mat-form-field-label {
        color: rgba(255, 255, 255, 0.7) !important;
      }

      .mat-form-field-underline {
        background-color: rgba(255, 255, 255, 0.7) !important;
      }

      .mat-input-element, .mat-select-value {
        color: white !important;
      }
    }
  `]
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  filters: EventQueryParams = {
    search: '',
    category: '',
    page: 0,
    size: 12
  };

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  onFiltersChange() {
    this.filters.page = 0;
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents(this.filters).subscribe({
      next: (response) => {
        this.events = response.content;
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }
} 