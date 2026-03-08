/**
 * CourseReviewsComponent - Child route component for /course/:id/reviews
 *
 * Displays course reviews with rating breakdown.
 * Loaded as a child route inside the CourseDetailComponent.
 * Uses the parent route's :id parameter to load reviews.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CourseService } from '../../services/course.service';
import { Review } from '../../models/course.model';

@Component({
  selector: 'app-course-reviews',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule],
  templateUrl: './course-reviews.html',
  styleUrl: './course-reviews.css',
})
export class CourseReviewsComponent implements OnInit {
  reviews: Review[] = [];
  averageRating = 0;
  totalReviews = 0;
  courseTitle = '';
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // Get the course ID from the parent route parameters
    this.route.parent?.params.subscribe((params) => {
      const courseId = +params['id'];
      this.loadReviews(courseId);
    });
  }

  /**
   * Load reviews for the specified course ID.
   */
  loadReviews(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe((course) => {
      if (course) {
        this.reviews = course.reviews;
        this.averageRating = course.rating;
        this.totalReviews = course.reviews.length;
        this.courseTitle = course.title;
      }
      this.isLoading = false;
    });
  }

  /**
   * Count reviews with a specific rating value.
   */
  getReviewCountByRating(rating: number): number {
    return this.reviews.filter((r) => r.rating === rating).length;
  }

  /**
   * Calculate the percentage of reviews with a specific rating.
   */
  getReviewPercentage(rating: number): number {
    if (this.totalReviews === 0) return 0;
    return (this.getReviewCountByRating(rating) / this.totalReviews) * 100;
  }

  /**
   * Generate an array of star indicators for display.
   * Returns 'filled' or 'empty' for each of 5 stars.
   */
  getStars(rating: number): string[] {
    return Array(5).fill('').map((_, i) => i < rating ? 'filled' : 'empty');
  }
}
