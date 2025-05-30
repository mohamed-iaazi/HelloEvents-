import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from '../../../interfaces/event.interface';

@Component({
  selector: 'app-create-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>Create New Event</h2>
    <mat-dialog-content>
      <form [formGroup]="eventForm" class="event-form">
        <mat-form-field appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" placeholder="Event title">
          <mat-error *ngIf="eventForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="date">
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="eventForm.get('date')?.hasError('required')">
            Date is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Location</mat-label>
          <input matInput formControlName="location" placeholder="Event location">
          <mat-error *ngIf="eventForm.get('location')?.hasError('required')">
            Location is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Category</mat-label>
          <mat-select formControlName="category">
            <mat-option value="Music">Music</mat-option>
            <mat-option value="Technology">Technology</mat-option>
            <mat-option value="Sports">Sports</mat-option>
            <mat-option value="Arts">Arts</mat-option>
            <mat-option value="Food">Food</mat-option>
          </mat-select>
          <mat-error *ngIf="eventForm.get('category')?.hasError('required')">
            Category is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Price</mat-label>
          <input matInput type="number" formControlName="price" placeholder="0.00">
          <mat-error *ngIf="eventForm.get('price')?.hasError('required')">
            Price is required
          </mat-error>
          <mat-error *ngIf="eventForm.get('price')?.hasError('min')">
            Price must be greater than or equal to 0
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Capacity</mat-label>
          <input matInput type="number" formControlName="capacity" placeholder="100">
          <mat-error *ngIf="eventForm.get('capacity')?.hasError('required')">
            Capacity is required
          </mat-error>
          <mat-error *ngIf="eventForm.get('capacity')?.hasError('min')">
            Capacity must be greater than 0
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="4" placeholder="Event description"></textarea>
          <mat-error *ngIf="eventForm.get('description')?.hasError('required')">
            Description is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Image URL</mat-label>
          <input matInput formControlName="image" placeholder="Image URL">
          <mat-error *ngIf="eventForm.get('image')?.hasError('required')">
            Image URL is required
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!eventForm.valid">
        Create Event
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .event-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
      min-width: 500px;
    }

    @media (max-width: 600px) {
      .event-form {
        min-width: unset;
        width: 100%;
      }
    }

    mat-form-field {
      width: 100%;
    }

    textarea {
      min-height: 100px;
    }
  `]
})
export class CreateEventDialogComponent {
  eventForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateEventDialogComponent>,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      capacity: [100, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const newEvent: Event = {
        ...this.eventForm.value,
        id: Date.now(), // Temporary ID generation
        availableTickets: this.eventForm.value.capacity
      };
      this.dialogRef.close(newEvent);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 