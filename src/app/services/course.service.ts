import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      title: 'Angular Fundamentals',
      description: 'Learn the basics of Angular framework including components, services, and routing.',
      category: 'Web Development',
      level: 'Beginner',
      price: 49.99,
      duration: 20,
      image: 'assets/courses/angular-fundamentals.jpg',
      instructor: {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        bio: 'Expert Angular developer with 10+ years of experience',
        image: 'https://via.placeholder.com/100x100?text=Sarah',
        specialization: 'Angular & TypeScript',
      },
      enrolledStudents: 1250,
      rating: 4.8,
      syllabus: [
        'Introduction to Angular',
        'Components & Templates',
        'Services & Dependency Injection',
        'Routing & Navigation',
        'Forms & Validation',
      ],
      reviews: [
        {
          id: 1,
          studentName: 'Roy Joseph',
          rating: 5,
          comment: 'Excellent course! Very comprehensive and well-structured.',
          date: '2024-01-10',
        },
        {
          id: 2,
          studentName: 'Jane Smith',
          rating: 4,
          comment: 'Great content, could use more real-world projects.',
          date: '2024-01-15',
        },
      ],
      learningOutcomes: [
        'Build responsive web applications with Angular',
        'Understand component lifecycle and change detection',
        'Implement reactive forms and validation',
        'Work with HTTP services and APIs',
      ],
    },
    {
      id: 2,
      title: 'Advanced TypeScript',
      description: 'Master advanced TypeScript concepts like generics, decorators, and type manipulation.',
      category: 'Programming',
      level: 'Advanced',
      price: 59.99,
      duration: 25,
      image: 'assets/courses/typescript-advanced.jpg',
      instructor: {
        id: 2,
        name: 'Michael Chen',
        email: 'michael@example.com',
        bio: 'TypeScript expert and open-source contributor',
        image: 'https://via.placeholder.com/100x100?text=Michael',
        specialization: 'TypeScript & JavaScript',
      },
      enrolledStudents: 856,
      rating: 4.9,
      syllabus: [
        'Type System Fundamentals',
        'Generics & Type Parameters',
        'Decorators & Metadata',
        'Advanced Types',
        'Best Practices',
      ],
      reviews: [
        {
          id: 3,
          studentName: 'Alice Brown',
          rating: 5,
          comment: 'Best TypeScript course I\'ve taken!',
          date: '2024-01-20',
        },
      ],
      learningOutcomes: [
        'Master generic types and constraints',
        'Create reusable type utilities',
        'Understand type narrowing and guards',
        'Build scalable applications with TypeScript',
      ],
    },
    {
      id: 3,
      title: 'Reactive Programming with RxJS',
      description: 'Learn reactive programming patterns using RxJS observables and operators.',
      category: 'Web Development',
      level: 'Intermediate',
      price: 54.99,
      duration: 22,
      image: 'assets/course-cover.svg',
      instructor: {
        id: 3,
        name: 'Emily Watson',
        email: 'emily@example.com',
        bio: 'RxJS specialist with expertise in reactive systems',
        image: 'https://via.placeholder.com/100x100?text=Emily',
        specialization: 'RxJS & Reactive Programming',
      },
      enrolledStudents: 945,
      rating: 4.7,
      syllabus: [
        'Observables & Subjects',
        'Operators & Transformation',
        'Error Handling',
        'Testing Observables',
        'Real-world Applications',
      ],
      reviews: [],
      learningOutcomes: [
        'Understand observable patterns',
        'Master common RxJS operators',
        'Handle complex async operations',
        'Build reactive Angular applications',
      ],
    },
    {
      id: 4,
      title: 'Material Design with Angular',
      description: 'Create beautiful and responsive UIs using Angular Material components.',
      category: 'UI/UX',
      level: 'Intermediate',
      price: 44.99,
      duration: 18,
      image: 'assets/course-cover.svg',
      instructor: {
        id: 4,
        name: 'David Martinez',
        email: 'david@example.com',
        bio: 'UI/UX designer and Angular Material expert',
        image: 'https://via.placeholder.com/100x100?text=David',
        specialization: 'Angular Material & UI Design',
      },
      enrolledStudents: 1500,
      rating: 4.6,
      syllabus: [
        'Material Design Principles',
        'Components & Themes',
        'Layouts & Grids',
        'Forms & Input',
        'Navigation & Menus',
      ],
      reviews: [
        {
          id: 4,
          studentName: 'Robert Lee',
          rating: 4,
          comment: 'Good introduction to Material Design',
          date: '2024-01-25',
        },
      ],
      learningOutcomes: [
        'Design modern Material interfaces',
        'Customize themes and colors',
        'Build responsive layouts',
        'Implement accessibility best practices',
      ],
    },
    {
      id: 5,
      title: 'Full Stack Development',
      description: 'Complete guide to building full-stack applications with Angular and Node.js.',
      category: 'Web Development',
      level: 'Advanced',
      price: 79.99,
      duration: 40,
      image: 'assets/course-cover.svg',
      instructor: {
        id: 5,
        name: 'Lisa Anderson',
        email: 'lisa@example.com',
        bio: 'Full-stack developer with 12+ years experience',
        image: 'https://via.placeholder.com/100x100?text=Lisa',
        specialization: 'Full Stack Development',
      },
      enrolledStudents: 680,
      rating: 4.8,
      syllabus: [
        'Frontend Architecture',
        'Backend Development',
        'Database Design',
        'API Integration',
        'Deployment & DevOps',
      ],
      reviews: [],
      learningOutcomes: [
        'Build end-to-end applications',
        'Design scalable architectures',
        'Implement secure authentication',
        'Deploy to production',
      ],
    },
    {
      id: 6,
      title: 'Web Performance Optimization',
      description: 'Optimize Angular applications for maximum performance and user experience.',
      category: 'Web Development',
      level: 'Advanced',
      price: 64.99,
      duration: 20,
      image: 'assets/course-cover.svg',
      instructor: {
        id: 6,
        name: 'James Wilson',
        email: 'james@example.com',
        bio: 'Performance optimization specialist',
        image: 'https://via.placeholder.com/100x100?text=James',
        specialization: 'Performance & Optimization',
      },
      enrolledStudents: 520,
      rating: 4.9,
      syllabus: [
        'Performance Metrics',
        'Code Splitting',
        'Lazy Loading',
        'Change Detection Optimization',
        'Bundle Analysis',
      ],
      reviews: [],
      learningOutcomes: [
        'Identify performance bottlenecks',
        'Implement optimization strategies',
        'Reduce bundle size',
        'Improve application speed',
      ],
    },
  ];

  private coursesSubject = new BehaviorSubject<Course[]>(this.courses);

  constructor() {}

  getCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return new Observable((observer) => {
      const course = this.courses.find((c) => c.id === id);
      observer.next(course);
      observer.complete();
    });
  }

  filterCourses(
    category?: string,
    level?: string,
    priceMax?: number
  ): Observable<Course[]> {
    return new Observable((observer) => {
      let filtered = this.courses;

      if (category && category !== 'All') {
        filtered = filtered.filter((c) => c.category === category);
      }

      if (level && level !== 'All') {
        filtered = filtered.filter((c) => c.level === level);
      }

      if (priceMax !== undefined && priceMax > 0) {
        filtered = filtered.filter((c) => c.price <= priceMax);
      }

      observer.next(filtered);
      observer.complete();
    });
  }

  getCategories(): string[] {
    return Array.from(new Set(this.courses.map((c) => c.category)));
  }

  getLevels(): string[] {
    return ['Beginner', 'Intermediate', 'Advanced'];
  }
}
