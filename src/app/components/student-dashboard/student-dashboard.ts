import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { Student, StudentProgress } from '../../models/student.model';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  constructor(
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  loadStudentData(): void {
    // Load all courses first, then enrolled courses
    this.courseService.getCourses().subscribe((courses) => {
      this.allCourses = courses;

      this.studentService.getCurrentStudent().subscribe((student) => {
        this.currentStudent = student;
        if (student) {
          this.loadEnrolledCourses(student.id);
        }
      });
    });
  }

  loadEnrolledCourses(studentId: number): void {
    this.studentService.getStudentProgress(studentId, this.allCourses).subscribe(
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

  updateProgress(enrollmentId: number, newPercentage: number): void {
    this.studentService.updateEnrollmentProgress(enrollmentId, newPercentage).subscribe(
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

