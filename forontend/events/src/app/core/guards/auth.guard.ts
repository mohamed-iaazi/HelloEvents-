import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  
  const requiredRole = route.data['role'];
  if (!requiredRole) {
    return true;
  }

  const userRoles = authService.getCurrentUser()?.roles || [];
  if (!userRoles.includes(requiredRole)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
}; 