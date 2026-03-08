/**
 * RegisterComponent - Template-driven form for new student registration.
 *
 * Features:
 * - Template-driven form with ngModel and validation
 * - Password strength validation (minlength, pattern for complexity)
 * - Confirm password matching
 * - Required fields validation
 * - Email format validation
 * - Uses Angular form control states: touched, dirty, valid, invalid
 * - Angular Material UI components
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  // Form model properties bound via [(ngModel)]
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';

  // UI state
  isSubmitting = false;
  registerError = '';
  showPassword = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Handle form submission.
   * Validates password match and registers the user.
   */
  onSubmit(): void {
    // Check if passwords match before submitting
    if (this.password !== this.confirmPassword) {
      this.registerError = 'Passwords do not match.';
      return;
    }

    this.isSubmitting = true;
    this.registerError = '';

    // Create a new student object for registration
    const newStudent = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      profileImage: 'https://via.placeholder.com/100x100?text=' + this.name.charAt(0),
      joinDate: new Date().toISOString().split('T')[0],
    };

    this.userService.register(newStudent).subscribe({
      next: () => {
        this.isSubmitting = false;
        // Show success notification
        this.snackBar.open('Registration successful! Welcome to LearnHub.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        // Navigate to the home page
        this.router.navigate(['/']);
      },
      error: () => {
        this.isSubmitting = false;
        this.registerError = 'Registration failed. Please try again.';
      },
    });
  }

  /**
   * Password strength check - returns strength level for UI feedback.
   */
  getPasswordStrength(): string {
    if (!this.password) return '';
    if (this.password.length < 6) return 'weak';
    if (this.password.length < 10) return 'medium';
    // Check for complexity: has number + special character + uppercase
    const hasUpper = /[A-Z]/.test(this.password);
    const hasNumber = /[0-9]/.test(this.password);
    const hasSpecial = /[!@#$%^&*]/.test(this.password);
    if (hasUpper && hasNumber && hasSpecial) return 'strong';
    if ((hasUpper && hasNumber) || (hasNumber && hasSpecial)) return 'medium';
    return 'medium';
  }

  /**
   * Check if passwords match (for real-time validation feedback).
   */
  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
