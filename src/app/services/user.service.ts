/**
 * UserService - Manages user authentication and session state.
 *
 * Responsibilities:
 * - Simulated login/logout functionality
 * - Store and manage user session via BehaviorSubject
 * - Authorization checks for route guards
 * - Fetch user data from mock JSON
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // BehaviorSubject to track the currently logged-in user
  private currentUserSubject = new BehaviorSubject<Student | null>(null);
  // Observable stream of the current user for components to subscribe to
  currentUser$ = this.currentUserSubject.asObservable();

  // In-memory store of registered users loaded from mock data
  private users: Student[] = [];

  // API endpoint for mock student data
  private apiUrl = '/data/students.json';

  constructor(private http: HttpClient) {
    // Load users from mock JSON and auto-login the first user for demo purposes
    this.loadUsers();
  }

  /**
   * Load users from the mock JSON file.
   * On success, auto-login the first user (simulating an existing session).
   */
  private loadUsers(): void {
    this.http.get<Student[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Failed to load users:', error);
        return of([]);
      })
    ).subscribe((users) => {
      this.users = users;
      // Auto-login first user for demo purposes
      if (users.length > 0) {
        this.currentUserSubject.next(users[0]);
      }
    });
  }

  /**
   * Simulated login - matches email and password against stored users.
   * Returns an Observable<boolean> indicating success or failure.
   */
  login(email: string, password: string): Observable<boolean> {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUserSubject.next(user);
      return of(true);
    }
    return of(false);
  }

  /**
   * Logout - clears the current user session.
   */
  logout(): void {
    this.currentUserSubject.next(null);
  }

  /**
   * Register a new user - adds to the in-memory user list and logs them in.
   * In a real app, this would POST to an API endpoint.
   */
  register(student: Omit<Student, 'id'>): Observable<Student> {
    const newStudent: Student = {
      ...student,
      id: this.users.length + 1,
    } as Student;
    this.users.push(newStudent);
    this.currentUserSubject.next(newStudent);
    return of(newStudent);
  }

  /**
   * Get the current user value (synchronous snapshot).
   */
  getCurrentUser(): Student | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if a user is currently logged in.
   */
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * Get current user as Observable (for async subscriptions).
   */
  getCurrentUser$(): Observable<Student | null> {
    return this.currentUser$;
  }

  /**
   * Update user profile information.
   */
  updateProfile(student: Student): Observable<boolean> {
    const index = this.users.findIndex((u) => u.id === student.id);
    if (index !== -1) {
      this.users[index] = student;
      this.currentUserSubject.next(student);
      return of(true);
    }
    return of(false);
  }
}
