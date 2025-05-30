export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLogin?: Date;
}

export interface UserActivity {
  id: number;
  userId: number;
  type: 'booking' | 'login' | 'registration';
  timestamp: Date;
  details: string;
} 