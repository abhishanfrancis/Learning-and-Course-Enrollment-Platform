/**
 * EnrollmentService - Manages course enrollment operations.
 *
 * Responsibilities:
 * - Enroll a student in a course
 * - Get enrolled courses for a student
 * - Track and update course progress
 * - Check enrollment status
 * - Uses HttpClient for initial data fetch and BehaviorSubject for state management
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { Enrollment, StudentProgress } from '../models/student.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  // BehaviorSubject to manage enrollment state reactively
  private enrollmentsSubject = new BehaviorSubject<Enrollment[]>([]);
  enrollments$ = this.enrollmentsSubject.asObservable();

  // API endpoint for mock enrollment data
  private apiUrl = '/data/enrollments.json';
  private dataLoaded = false;

  constructor(private http: HttpClient) {
    // Load initial enrollment data from mock JSON
    this.loadEnrollments();
  }

  /**
   * Fetch enrollments from the mock JSON file.
   * Data is loaded once and then managed in-memory via BehaviorSubject.
   */
  private loadEnrollments(): void {
    this.http.get<Enrollment[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Failed to load enrollments:', error);
        // Fallback to hardcoded data if JSON fetch fails
        return of([
          {
            id: 1, studentId: 1, courseId: 1,
            enrollmentDate: '2024-01-05', completionPercentage: 65,
            lastAccessedDate: '2024-01-22', status: 'Active' as const,
            certificateObtained: false,
          },
          {
            id: 2, studentId: 1, courseId: 3,
            enrollmentDate: '2024-01-10', completionPercentage: 40,
            lastAccessedDate: '2024-01-20', status: 'Active' as const,
            certificateObtained: false,
          },
          {
            id: 3, studentId: 1, courseId: 4,
            enrollmentDate: '2023-12-01', completionPercentage: 100,
            lastAccessedDate: '2024-01-15', status: 'Completed' as const,
            certificateObtained: true,
          },
        ]);
      })
    ).subscribe((enrollments) => {
      this.enrollmentsSubject.next(enrollments);
      this.dataLoaded = true;
    });
  }

  /**
   * Enroll a student in a course.
   * Creates a new enrollment record and updates the BehaviorSubject.
   */
  enrollStudent(studentId: number, courseId: number): Observable<Enrollment> {
    return this.enrollments$.pipe(
      take(1),
      map((enrollments) => {
        const newEnrollment: Enrollment = {
          id: enrollments.length + 1,
          studentId,
          courseId,
          enrollmentDate: new Date().toISOString().split('T')[0],
          completionPercentage: 0,
          lastAccessedDate: new Date().toISOString().split('T')[0],
          status: 'Active',
          certificateObtained: false,
        };
        // Add the new enrollment and emit updated list
        const updated = [...enrollments, newEnrollment];
        this.enrollmentsSubject.next(updated);
        return newEnrollment;
      })
    );
  }

  /**
   * Get all enrollments for a specific student.
   */
  getStudentEnrollments(studentId: number): Observable<Enrollment[]> {
    return this.enrollments$.pipe(
      map((enrollments) => enrollments.filter((e) => e.studentId === studentId))
    );
  }

  /**
   * Get all enrollments (for admin or global views).
   */
  getAllEnrollments(): Observable<Enrollment[]> {
    return this.enrollments$;
  }

  /**
   * Check if a student is enrolled in a specific course.
   */
  isEnrolled(studentId: number, courseId: number): Observable<boolean> {
    return this.getStudentEnrollments(studentId).pipe(
      map((enrollments) => enrollments.some((e) => e.courseId === courseId))
    );
  }

  /**
   * Get student progress by combining enrollment data with course data.
   * Maps each enrollment to a StudentProgress object with course details.
   */
  getStudentProgress(studentId: number, courses: Course[]): Observable<StudentProgress[]> {
    return this.getStudentEnrollments(studentId).pipe(
      map((enrollments) =>
        enrollments.map((enrollment) => {
          const course = courses.find((c) => c.id === enrollment.courseId);
          return {
            enrollmentId: enrollment.id,
            courseId: enrollment.courseId,
            courseName: course?.title || 'Unknown Course',
            completionPercentage: enrollment.completionPercentage,
            status: enrollment.status,
            lastAccessed: enrollment.lastAccessedDate,
            instructor: course?.instructor?.name || 'Unknown',
          };
        })
      )
    );
  }

  /**
   * Update enrollment progress percentage.
   * Automatically marks as 'Completed' and grants certificate at 100%.
   */
  updateProgress(enrollmentId: number, completionPercentage: number): Observable<boolean> {
    return this.enrollments$.pipe(
      take(1),
      map((enrollments) => {
        const index = enrollments.findIndex((e) => e.id === enrollmentId);
        if (index !== -1) {
          const updated = [...enrollments];
          updated[index] = {
            ...updated[index],
            completionPercentage,
            lastAccessedDate: new Date().toISOString().split('T')[0],
            // Auto-complete and grant certificate at 100%
            status: completionPercentage === 100 ? 'Completed' : updated[index].status,
            certificateObtained: completionPercentage === 100 ? true : updated[index].certificateObtained,
          };
          this.enrollmentsSubject.next(updated);
          return true;
        }
        return false;
      })
    );
  }
}
