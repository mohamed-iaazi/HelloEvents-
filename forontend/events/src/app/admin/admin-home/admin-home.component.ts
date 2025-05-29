import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { UserActivity } from '../../interfaces/user.interface';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  activities: UserActivity[] = [
    {
      id: 1,
      userId: 1,
      type: 'booking',
      timestamp: new Date('2024-03-20'),
      details: 'Booked 2 tickets for Summer Music Festival'
    }
  ];

  displayedActivityColumns: string[] = ['timestamp', 'type', 'details'];
  totalUsers = 150;
  totalBookings = 85;
  totalRevenue = 12499.99;

  constructor() {}

  ngOnInit(): void {
    // In a real app, fetch data from a service
  }
} 