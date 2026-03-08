/**
 * EnrollFormComponent - Reactive enrollment form with payment details.
 *
 * Uses:
 * - ReactiveFormsModule with FormBuilder and Validators for form validation
 * - EnrollmentService instead of StudentService for enrollment operations
 * - MatDialog to show enrollment success confirmation popup
 * - UserService for getting current authenticated user
 * - Angular Material components (MatCard, MatButton, MatIcon, MatSnackBar)
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { UserService } from '../../services/user.service';
import { Course } from '../../models/course.model';
import { EnrollmentDialogComponent } from '../enrollment-dialog/enrollment-dialog';

@Component({
  selector: 'app-enroll-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule
  ],
  templateUrl: './enroll-form.html',
  styleUrl: './enroll-form.css',
})
export class EnrollFormComponent implements OnInit {
  enrollForm!: FormGroup;
  course: Course | undefined;
  isSubmitting = false;
  enrollmentSuccess = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = params['id'];
      this.loadCourse(courseId);
    });
  }

  /** Initialize the reactive form with validators */
  initializeForm(): void {
    this.enrollForm = this.fb.group({
      cardName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      agreeTerms: [false, Validators.requiredTrue],
    });
  }

  loadCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe((course) => {
      this.course = course;
    });
  }

  // Form control getters for template access
  get cardName() { return this.enrollForm.get('cardName'); }
  get cardNumber() { return this.enrollForm.get('cardNumber'); }
  get expiryDate() { return this.enrollForm.get('expiryDate'); }
  get cvv() { return this.enrollForm.get('cvv'); }
  get agreeTerms() { return this.enrollForm.get('agreeTerms'); }

  /**
   * Form submission handler.
   * Uses EnrollmentService to enroll, then opens MatDialog confirmation.
   */
  onSubmit(): void {
    if (this.enrollForm.valid && this.course) {
      this.isSubmitting = true;
      this.errorMessage = '';

      // Get current user from UserService
      this.userService.getCurrentUser$().subscribe((user) => {
        if (!user) {
          this.isSubmitting = false;
          this.errorMessage = 'Please log in to enroll.';
          return;
        }

        // Use EnrollmentService to enroll the student
        this.enrollmentService.enrollStudent(user.id, this.course!.id).subscribe({
          next: () => {
            this.isSubmitting = false;
            this.enrollmentSuccess = true;

            // Show MatSnackBar success notification
            this.snackBar.open('Enrollment successful!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });

            // Open MatDialog confirmation popup
            const dialogRef = this.dialog.open(EnrollmentDialogComponent, {
              width: '450px',
              data: {
                courseTitle: this.course!.title,
                courseInstructor: this.course!.instructor.name,
                coursePrice: this.course!.price,
              }
            });

            // Handle dialog close - navigate based on user choice
            dialogRef.afterClosed().subscribe((result) => {
              if (result === 'dashboard') {
                this.router.navigate(['/dashboard']);
              } else {
                // Auto redirect to dashboard after 2 seconds
                setTimeout(() => {
                  this.router.navigate(['/dashboard']);
                }, 2000);
              }
            });
          },
          error: () => {
            this.isSubmitting = false;
            this.errorMessage = 'Failed to enroll. Please try again.';
            this.snackBar.open('Enrollment failed. Please try again.', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      });
    }
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    this.enrollForm.patchValue({ cardNumber: value }, { emitEvent: false });
    event.target.value = formattedValue;
  }

  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.enrollForm.patchValue({ expiryDate: value }, { emitEvent: false });
    event.target.value = value;
  }
}

