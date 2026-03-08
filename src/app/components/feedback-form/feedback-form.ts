/**
 * FeedbackFormComponent - Reactive form for course feedback/reviews.
 *
 * Features:
 * - Reactive form with FormBuilder and Validators
 * - Rating selection
 * - Comment text area with min length validation
 * - Uses Angular form control states: touched, dirty, valid, invalid
 * - Displays error messages dynamically
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,    // Required for reactive forms
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.css',
})
export class FeedbackFormComponent implements OnInit {
  // Reactive form group built with FormBuilder
  feedbackForm!: FormGroup;
  course: Course | undefined;
  isSubmitting = false;
  submitted = false;

  // Rating value for star selection (not part of form group for visual purposes)
  selectedRating = 0;
  hoverRating = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // Get course ID from route params
    this.route.params.subscribe((params) => {
      const courseId = +params['id'];
      this.loadCourse(courseId);
    });
  }

  /**
   * Initialize the reactive form with validators.
   * Demonstrates FormBuilder, Validators, and custom validation.
   */
  private initForm(): void {
    this.feedbackForm = this.fb.group({
      // Rating: required, must be between 1-5
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      // Name: required, minimum 3 characters
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // Email: required, must be valid email format
      email: ['', [Validators.required, Validators.email]],
      // Comment: required, minimum 10 characters
      comment: ['', [Validators.required, Validators.minLength(10)]],
      // Would recommend: boolean
      recommend: [true],
    });
  }

  loadCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe((course) => {
      this.course = course;
    });
  }

  // Form control getters for easy access in the template
  get rating() { return this.feedbackForm.get('rating'); }
  get studentName() { return this.feedbackForm.get('studentName'); }
  get email() { return this.feedbackForm.get('email'); }
  get comment() { return this.feedbackForm.get('comment'); }

  /**
   * Set the rating when a star is clicked.
   */
  setRating(value: number): void {
    this.selectedRating = value;
    this.feedbackForm.patchValue({ rating: value });
  }

  /**
   * Handle mouse hover over stars for visual feedback.
   */
  onStarHover(value: number): void {
    this.hoverRating = value;
  }

  onStarLeave(): void {
    this.hoverRating = 0;
  }

  /**
   * Submit the feedback form.
   * Validates all fields and shows appropriate feedback.
   */
  onSubmit(): void {
    // Mark all controls as touched to trigger validation display
    this.feedbackForm.markAllAsTouched();

    if (this.feedbackForm.valid) {
      this.isSubmitting = true;

      // Simulate API call with a timeout
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitted = true;

        // Show success notification via MatSnackBar
        this.snackBar.open('Thank you for your feedback!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      }, 1500);
    }
  }
}
