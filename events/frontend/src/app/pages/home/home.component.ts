import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatToolbarModule,
    MatTooltipModule
  ]
})
export class HomeComponent implements OnInit {
  events = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: new Date('2024-07-15'),
      location: 'Central Park',
      category: 'Music',
      price: 49.99,
      image: 'assets/images/music-festival.jpg',
      description: 'Join us for an amazing summer music festival featuring top artists!'
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      date: new Date('2024-06-20'),
      location: 'Convention Center',
      category: 'Technology',
      price: 299.99,
      image: 'assets/images/tech-conf.jpg',
      description: 'Explore the latest innovations in technology and digital transformation.'
    },
    {
      id: 3,
      title: 'Food & Wine Expo',
      date: new Date('2024-08-05'),
      location: 'Grand Hotel',
      category: 'Food',
      price: 79.99,
      image: 'assets/images/food-expo.jpg',
      description: 'Experience culinary delights and wine tasting from around the world.'
    }
  ];

  categories = ['All', 'Music', 'Technology', 'Food', 'Sports', 'Art'];
  selectedCategory = 'All';
  searchQuery = '';
  selectedDate: Date | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  filterEvents() {
    return this.events.filter(event => {
      const matchesCategory = this.selectedCategory === 'All' || event.category === this.selectedCategory;
      const matchesSearch = event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDate = !this.selectedDate || 
                         event.date.toDateString() === new Date(this.selectedDate).toDateString();
      
      return matchesCategory && matchesSearch && matchesDate;
    });
  }

  clearFilters() {
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.selectedDate = null;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToAdminDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }
} 