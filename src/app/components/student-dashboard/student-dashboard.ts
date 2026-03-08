/**
 * StudentDashboardComponent - Dashboard showing enrolled courses and progress.
 *
 * Features:
 * - Uses UserService for current authenticated user data
 * - Uses EnrollmentService for enrollment data and progress tracking
 * - Uses Angular Material MatProgressBar for visual progress indicators
 * - Uses Angular Material MatTable for listing enrolled courses
 * - Active/Completed tab navigation
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseService } from '../../services/course.service';
import { Student, StudentProgress } from '../../models/student.model';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatProgressBarModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule
  ],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboardComponent implements OnInit {
  currentStudent: Student | null = null;
  enrolledCourses: StudentProgress[] = [];
  allCourses: Course[] = [];
  isLoading = true;
  activeTab: 'active' | 'completed' = 'active';
  Math = Math;

  // Columns for MatTable display
  displayedColumns: string[] = ['courseName', 'instructor', 'progress', 'status', 'actions'];

  constructor(
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  /** Load current user data, all courses, then enrolled courses */
  loadStudentData(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.allCourses = courses;

      // Get current user from UserService (reactive auth)
      this.userService.getCurrentUser$().subscribe((student) => {
        this.currentStudent = student;
        if (student) {
          this.loadEnrolledCourses(student.id);
        } else {
          this.isLoading = false;
        }
      });
    });
  }

  /** Load enrolled courses with progress from EnrollmentService */
  loadEnrolledCourses(studentId: number): void {
    this.enrollmentService.getStudentProgress(studentId, this.allCourses).subscribe(
      (progress) => {
        this.enrolledCourses = progress;
        this.isLoading = false;
      }
    );
  }

  getActiveCourses(): StudentProgress[] {
    return this.enrolledCourses.filter((c) => c.status === 'Active');
  }

  getCompletedCourses(): StudentProgress[] {
    return this.enrolledCourses.filter((c) => c.status === 'Completed');
  }

  /** Update course progress using EnrollmentService */
  updateProgress(enrollmentId: number, newPercentage: number): void {
    this.enrollmentService.updateProgress(enrollmentId, newPercentage).subscribe(
      () => {
        const course = this.enrolledCourses.find((c) => c.enrollmentId === enrollmentId);
        if (course) {
          course.completionPercentage = newPercentage;
          if (newPercentage === 100) {
            course.status = 'Completed';
          }
        }
      }
    );
  }

  getTotalCompletionPercentage(): number {
    if (this.enrolledCourses.length === 0) return 0;
    const total = this.enrolledCourses.reduce(
      (sum, course) => sum + course.completionPercentage,
      0
    );
    return Math.round(total / this.enrolledCourses.length);
  }

  getCompletedCoursesCount(): number {
    return this.enrolledCourses.filter((c) => c.status === 'Completed').length;
  }
}

