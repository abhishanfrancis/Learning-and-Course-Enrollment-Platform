/**
 * LoginComponent - Template-driven form for user authentication.
 *
 * Features:
 * - Template-driven form with [(ngModel)] two-way data binding
 * - Validation: required fields, email format validation
 * - Uses Angular form control states: touched, dirty, valid, invalid
 * - Redirects to returnUrl after successful login
 * - Displays error messages dynamically
 * - Uses Angular Material components for UI
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,        // Required for template-driven forms
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  // Form model properties bound via [(ngModel)]
  email = '';
  password = '';

  // UI state flags
  isSubmitting = false;
  loginError = '';
  showPassword = false;

  // URL to redirect to after successful login
  private returnUrl = '/';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    // Get the return URL from query parameters (set by AuthGuard)
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Handle form submission.
   * Validates input and calls UserService.login().
   */
  onSubmit(): void {
    this.isSubmitting = true;
    this.loginError = '';

    this.userService.login(this.email, this.password).subscribe((success) => {
      this.isSubmitting = false;
      if (success) {
        // Show success notification via MatSnackBar
        this.snackBar.open('Login successful! Welcome back.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        // Navigate to the return URL or home
        this.router.navigateByUrl(this.returnUrl);
      } else {
        // Show error message for invalid credentials
        this.loginError = 'Invalid email or password. Try roy@example.com / password123';
      }
    });
  }

  /**
   * Toggle password visibility.
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Auto-fill login form with demo user credentials.
   * Allows quick testing without manually typing credentials.
   */
  fillDemoUser(user: 'roy' | 'jane'): void {
    const demoUsers = {
      roy:  { email: 'roy@example.com',  password: 'password123' },
      jane: { email: 'jane@example.com', password: 'password456' },
    };
    this.email = demoUsers[user].email;
    this.password = demoUsers[user].password;
    this.loginError = '';
  }
}
