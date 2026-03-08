/**
 * RelatedCoursesComponent - Child route component for /course/:id/related
 *
 * Displays courses related to the current course by matching category.
 * Loaded as a child route inside the CourseDetailComponent.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-related-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    CurrencyPipe,
  ],
  templateUrl: './related-courses.html',
  styleUrl: './related-courses.css',
})
export class RelatedCoursesComponent implements OnInit {
  relatedCourses: Course[] = [];
  currentCourseId = 0;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // Get the course ID from the parent route parameters
    this.route.parent?.params.subscribe((params) => {
      this.currentCourseId = +params['id'];
      this.loadRelatedCourses(this.currentCourseId);
    });
  }

  /**
   * Load related courses — courses in the same category, excluding the current one.
   */
  loadRelatedCourses(courseId: number): void {
    // First get the current course to know its category
    this.courseService.getCourseById(courseId).subscribe((course) => {
      if (course) {
        // Then fetch all courses and filter by same category (excluding current)
        this.courseService.getCourses().subscribe((allCourses) => {
          this.relatedCourses = allCourses.filter(
            (c) => c.category === course.category && c.id !== courseId
          );
          // If no related courses in same category, show courses of same level
          if (this.relatedCourses.length === 0) {
            this.relatedCourses = allCourses.filter(
              (c) => c.level === course.level && c.id !== courseId
            ).slice(0, 4);
          }
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }
}
