import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student, Enrollment, StudentProgress } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private currentStudent: Student | null = {
    id: 1,
    name: 'Roy Joseph',
    email: 'roy@example.com',
    password: 'password123',
    phone: '+1 (555) 123-4567',
    profileImage: 'https://image2url.com/r2/default/images/1769100653013-6c34be2e-4be5-4146-b42e-cb6ebe7e303d.jpg',
    joinDate: '2023-06-15',
  };

  private enrollments: Enrollment[] = [
    {
      id: 1,
      studentId: 1,
      courseId: 1,
      enrollmentDate: '2024-01-05',
      completionPercentage: 65,
      lastAccessedDate: '2024-01-22',
      status: 'Active',
      certificateObtained: false,
    },
    {
      id: 2,
      studentId: 1,
      courseId: 3,
      enrollmentDate: '2024-01-10',
      completionPercentage: 40,
      lastAccessedDate: '2024-01-20',
      status: 'Active',
      certificateObtained: false,
    },
    {
      id: 3,
      studentId: 1,
      courseId: 4,
      enrollmentDate: '2023-12-01',
      completionPercentage: 100,
      lastAccessedDate: '2024-01-15',
      status: 'Completed',
      certificateObtained: true,
    },
  ];

  private studentSubject = new BehaviorSubject<Student | null>(this.currentStudent);
  private enrollmentsSubject = new BehaviorSubject<Enrollment[]>(this.enrollments);

  constructor() {}

  getCurrentStudent(): Observable<Student | null> {
    return this.studentSubject.asObservable();
  }

  getStudent(id: number): Observable<Student | null> {
    return new Observable((observer) => {
      observer.next(this.currentStudent);
      observer.complete();
    });
  }

  updateStudent(student: Student): Observable<boolean> {
    return new Observable((observer) => {
      this.currentStudent = student;
      this.studentSubject.next(student);
      observer.next(true);
      observer.complete();
    });
  }

  enrollCourse(studentId: number, courseId: number): Observable<Enrollment> {
    return new Observable((observer) => {
      const newEnrollment: Enrollment = {
        id: this.enrollments.length + 1,
        studentId,
        courseId,
        enrollmentDate: new Date().toISOString().split('T')[0],
        completionPercentage: 0,
        lastAccessedDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        certificateObtained: false,
      };

      this.enrollments.push(newEnrollment);
      this.enrollmentsSubject.next(this.enrollments);
      observer.next(newEnrollment);
      observer.complete();
    });
  }

  getEnrollments(studentId: number): Observable<Enrollment[]> {
    return this.enrollmentsSubject.asObservable().pipe(
      map((enrollments) => enrollments.filter((e) => e.studentId === studentId))
    );
  }

  getAllEnrollments(): Observable<Enrollment[]> {
    return this.enrollmentsSubject.asObservable();
  }

  isEnrolled(studentId: number, courseId: number): Observable<boolean> {
    return this.getEnrollments(studentId).pipe(
      map((enrollments) => enrollments.some((e) => e.courseId === courseId))
    );
  }

  getStudentProgress(studentId: number, courses: any[]): Observable<StudentProgress[]> {
    return new Observable((observer) => {
      const progress = this.enrollments
        .filter((e) => e.studentId === studentId)
        .map((enrollment) => {
          const course = courses.find((c) => c.id === enrollment.courseId);
          return {
            enrollmentId: enrollment.id,
            courseId: enrollment.courseId,
            courseName: course?.title || '',
            completionPercentage: enrollment.completionPercentage,
            status: enrollment.status,
            lastAccessed: enrollment.lastAccessedDate,
            instructor: course?.instructor?.name || '',
          };
        });

      observer.next(progress);
      observer.complete();
    });
  }

  updateEnrollmentProgress(
    enrollmentId: number,
    completionPercentage: number
  ): Observable<boolean> {
    return new Observable((observer) => {
      const enrollment = this.enrollments.find((e) => e.id === enrollmentId);
      if (enrollment) {
        enrollment.completionPercentage = completionPercentage;
        enrollment.lastAccessedDate = new Date().toISOString().split('T')[0];
        if (completionPercentage === 100) {
          enrollment.status = 'Completed';
          enrollment.certificateObtained = true;
        }
        this.enrollmentsSubject.next(this.enrollments);
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }
}
