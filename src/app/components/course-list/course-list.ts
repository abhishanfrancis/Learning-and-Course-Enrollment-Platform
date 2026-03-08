/**
 * CourseListComponent - Displays all courses with filtering capabilities.
 *
 * Features:
 * - Uses custom pipes (CourseFilterPipe, CourseLevelPipe, CourseDurationPipe) for filtering
 * - Uses custom directives (HighlightTrending, HighlightNew) for visual highlighting
 * - Uses Angular Material components (MatCard, MatButton, MatIcon)
 * - Uses EnrollmentService to check enrollment status
 * - Uses UserService for authentication state
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';
// Custom pipes for filtering
import { CourseFilterPipe, CourseLevelPipe, CourseDurationPipe } from '../../pipes/course-filter.pipe';
// Custom directives for visual highlighting
import { HighlightTrendingDirective, HighlightNewDirective } from '../../directives/highlight-course.directive';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule,
    CourseFilterPipe, CourseLevelPipe, CourseDurationPipe,
    HighlightTrendingDirective, HighlightNewDirective
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  categories: string[] = [];
  levels: string[] = [];
  currentStudent: Student | null = null;
  enrolledCourseIds: number[] = [];

  // Filter properties bound to template controls
  selectedCategory = 'All';
  selectedLevel = 'All';
  maxPrice = 100;

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadCategories();
    this.loadLevels();
    this.loadCurrentStudent();
  }

  /** Load all courses from CourseService (HttpClient-backed) */
  loadCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      this.applyFilters();
    });
  }

  loadCategories(): void {
    // Categories are derived from the loaded courses
    this.categories = ['All', ...this.courseService.getCategories()];
  }

  loadLevels(): void {
    this.levels = ['All', ...this.courseService.getLevels()];
  }

  /** Load current user from UserService and enrolled courses from EnrollmentService */
  loadCurrentStudent(): void {
    this.userService.getCurrentUser$().subscribe((student) => {
      this.currentStudent = student;
      if (student) {
        // Load enrolled course IDs for the current user
        this.enrollmentService.getStudentEnrollments(student.id).subscribe((enrollments) => {
          this.enrolledCourseIds = enrollments.map((e) => e.courseId);
        });
      }
    });
  }

  /** Apply all active filters using CourseService's filter method */
  applyFilters(): void {
    this.courseService
      .filterCourses(
        this.selectedCategory === 'All' ? undefined : this.selectedCategory,
        this.selectedLevel === 'All' ? undefined : this.selectedLevel,
        this.maxPrice
      )
      .subscribe((filtered) => {
        this.filteredCourses = filtered;
      });
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onLevelChange(): void {
    this.applyFilters();
  }

  onPriceChange(): void {
    this.applyFilters();
  }

  /** Check if the current user is enrolled in a specific course */
  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }
}
