/**
 * CourseService - Manages course data using HttpClient.
 *
 * Fetches course data from /data/courses.json using Angular's HttpClient.
 * Stores loaded courses in a BehaviorSubject for reactive access.
 * Provides filtering, searching, and category/level retrieval.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  // BehaviorSubject to hold the list of courses for reactive updates
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  private coursesLoaded = false;

  constructor(private http: HttpClient) {
    // Automatically load courses from the mock JSON on service initialization
    this.loadCourses();
  }

  /**
   * Loads courses from the mock JSON file via HttpClient.
   * Only fetches once; subsequent calls use cached data.
   */
  private loadCourses(): void {
    if (this.coursesLoaded) return;

    this.http.get<Course[]>('/data/courses.json').pipe(
      tap((courses) => {
        this.coursesSubject.next(courses);
        this.coursesLoaded = true;
      }),
      catchError((error) => {
        console.error('Failed to load courses from JSON, using fallback data', error);
        // Fallback: return empty array if HTTP fails
        return of([]);
      })
    ).subscribe();
  }

  /**
   * Returns an Observable of all courses.
   * Components subscribe to this to receive course data reactively.
   */
  getCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  /**
   * Returns a single course by its ID.
   * Searches within the locally cached courses array.
   */
  getCourseById(id: number): Observable<Course | undefined> {
    return this.coursesSubject.asObservable().pipe(
      map((courses) => courses.find((c) => c.id === id))
    );
  }

  /**
   * Filters courses by category, level, and maximum price.
   * Returns an Observable of the filtered course list.
   */
  filterCourses(
    category?: string,
    level?: string,
    priceMax?: number
  ): Observable<Course[]> {
    return this.coursesSubject.asObservable().pipe(
      map((courses) => {
        let filtered = courses;

        if (category && category !== 'All') {
          filtered = filtered.filter((c) => c.category === category);
        }

        if (level && level !== 'All') {
          filtered = filtered.filter((c) => c.level === level);
        }

        if (priceMax !== undefined && priceMax > 0) {
          filtered = filtered.filter((c) => c.price <= priceMax);
        }

        return filtered;
      })
    );
  }

  /**
   * Extracts unique categories from the loaded courses.
   */
  getCategories(): string[] {
    return Array.from(new Set(this.coursesSubject.getValue().map((c) => c.category)));
  }

  /**
   * Returns the available course difficulty levels.
   */
  getLevels(): string[] {
    return ['Beginner', 'Intermediate', 'Advanced'];
  }

  /**
   * Returns trending courses (isTrending flag set to true).
   */
  getTrendingCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable().pipe(
      map((courses) => courses.filter((c) => c.isTrending))
    );
  }

  /**
   * Returns newest courses (isNew flag set to true).
   */
  getNewCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable().pipe(
      map((courses) => courses.filter((c) => c.isNew))
    );
  }
}
