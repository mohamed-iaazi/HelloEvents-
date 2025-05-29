import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      email: 'user@example.com',
      name: 'John Doe',
      role: 'user',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-03-20')
    },
    {
      id: 2,
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
      lastLogin: new Date('2024-03-21')
    }
  ];

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'createdAt',
    'lastLogin',
    'actions'
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // In a real app, fetch users from a service
  }

  deleteUser(userId: number) {
    // In a real app, this would call an API
    this.users = this.users.filter(user => user.id !== userId);
    this.snackBar.open('User deleted successfully', 'Close', {
      duration: 3000
    });
  }

  viewDetails(user: User) {
    // TODO: Implement view user details dialog
    this.snackBar.open('User details view coming soon!', 'Close', {
      duration: 3000
    });
  }

  editUser(user: User) {
    // TODO: Implement edit user dialog
    this.snackBar.open('User editing coming soon!', 'Close', {
      duration: 3000
    });
  }

  viewUserActivity(userId: number) {
    // TODO: Implement view user activity dialog
    this.snackBar.open('User activity view coming soon!', 'Close', {
      duration: 3000
    });
  }

  getRoleColor(role: string): string {
    return role === 'admin' ? 'warn' : 'primary';
  }
} 