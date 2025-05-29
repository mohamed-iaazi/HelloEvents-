import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <div class="register-container">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
        <h2>Register</h2>
        
        <mat-form-field appearance="fill">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" required>
          <mat-error *ngIf="registerForm.get('username')?.hasError('required')">
            Username is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" required>
          <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
            Please enter a valid email address
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" required>
          <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
            Password is required
          </mat-error>
          <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
            Password must be at least 6 characters long
          </mat-error>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">
          Register
        </button>

        <p class="login-link">
          Already have an account? <a routerLink="/login">Login here</a>
        </p>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
    }

    .register-form {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-radius: 10px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }

    h2 {
      color: white;
      text-align: center;
      margin-bottom: 2rem;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }

    button {
      width: 100%;
      margin-top: 1rem;
    }

    .login-link {
      text-align: center;
      margin-top: 1rem;
      color: white;
    }

    .login-link a {
      color: #64b5f6;
      text-decoration: none;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    ::ng-deep .mat-form-field-label {
      color: rgba(255, 255, 255, 0.7) !important;
    }

    ::ng-deep .mat-form-field-underline {
      background-color: rgba(255, 255, 255, 0.7) !important;
    }

    ::ng-deep .mat-input-element {
      color: white !important;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService.register(username, email, password).subscribe({
        next: () => {
          this.snackBar.open('Registration successful! Please login.', 'Close', {
            duration: 5000
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.snackBar.open(
            error.error?.message || 'Registration failed. Please try again.',
            'Close',
            { duration: 5000 }
          );
        }
      });
    }
  }
} 