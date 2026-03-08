/**
 * App Configuration - Central configuration for the Angular application.
 *
 * Registers:
 * - Router with application routes
 * - HttpClient with the global error interceptor
 * - Animations for Angular Material components
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Enable HttpClient with the global HTTP error interceptor
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    // Enable animations for Angular Material (async for better performance)
    provideAnimationsAsync()
  ]
};
