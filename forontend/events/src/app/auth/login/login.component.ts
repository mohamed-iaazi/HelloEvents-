import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="Enter your email">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="email?.errors?.['required']">Email is required</mat-error>
              <mat-error *ngIf="email?.errors?.['email']">Please enter a valid email</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="password?.errors?.['required']">Password is required</mat-error>
              <mat-error *ngIf="password?.errors?.['minlength']">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
              Login
            </button>
          </form>
        </mat-card-content>
        <mat-card-footer>
          <div class="auth-links">
            Don't have an account? 
            <a routerLink="/register">Register here</a>
          </div>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 40px);
    }
    mat-card {
      width: 100%;
      max-width: 400px;
      margin: 2rem;
    }
    mat-card-header {
      justify-content: center;
      margin-bottom: 1rem;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    form {
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }
    .auth-links {
      text-align: center;
      padding: 1rem;
      font-size: 0.9rem;
    }
    .auth-links a {
      color: var(--mat-primary-color);
      text-decoration: none;
      margin-left: 0.5rem;
    }
    .auth-links a:hover {
      text-decoration: underline;
    }
    button[type="submit"] {
      margin-top: 1rem;
    }
  `],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Here you would typically call your auth service
    }
  }
} 