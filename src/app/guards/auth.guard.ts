/**
 * AuthGuard - Route guard to restrict access to authenticated users only.
 *
 * Uses functional guard pattern (Angular 15+).
 * Checks if a user is logged in via UserService.
 * If not authenticated, redirects to /login with the attempted URL as a query param.
 */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  // Check if the user is currently logged in
  if (userService.isLoggedIn()) {
    return true; // Allow navigation
  }

  // User is not logged in — redirect to login page
  // Pass the attempted URL as a query parameter so we can redirect back after login
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false; // Block navigation
};
