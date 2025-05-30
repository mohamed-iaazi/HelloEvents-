import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  // Check if route has role requirement
  const requiredRole = route.data['role'];
  if (requiredRole && !authService.hasRole(requiredRole)) {
    router.navigate(['/']);
    return false;
  }

  return true;
}; 