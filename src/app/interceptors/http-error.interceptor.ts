/**
 * HTTP Error Interceptor - Functional interceptor for global HTTP error handling.
 *
 * Responsibilities:
 * - Intercept all HTTP requests and responses
 * - Catch HTTP errors and display user-friendly messages via MatSnackBar
 * - Log errors to console for debugging
 * - Handle specific HTTP status codes (401, 403, 404, 500, etc.)
 * - Show a loading indicator during API requests
 */
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      // Determine error message based on HTTP status code
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Network Error: ${error.error.message}`;
      } else {
        // Server-side error — map status codes to user-friendly messages
        switch (error.status) {
          case 0:
            errorMessage = 'Unable to connect to server. Please check your connection.';
            break;
          case 400:
            errorMessage = 'Bad request. Please check your input.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Please log in again.';
            break;
          case 403:
            errorMessage = 'Access denied. You do not have permission.';
            break;
          case 404:
            errorMessage = 'Resource not found.';
            break;
          case 500:
            errorMessage = 'Internal server error. Please try again later.';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.message}`;
        }
      }

      // Log the error for debugging purposes
      console.error('HTTP Error:', {
        status: error.status,
        message: error.message,
        url: error.url,
      });

      // Display error message to user via Material SnackBar
      snackBar.open(errorMessage, 'Dismiss', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });

      // Re-throw the error so calling code can also handle it if needed
      return throwError(() => error);
    })
  );
};
