/**
 * Application Routes Configuration
 *
 * Defines all routes including:
 * - Public routes: home, courses, course detail with child routes (reviews, related)
 * - Auth routes: login, register
 * - Protected routes: dashboard, enroll, feedback (guarded by authGuard)
 * - Child routes: course detail has nested reviews and related courses routes
 */
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { CourseListComponent } from './components/course-list/course-list';
import { CourseDetailComponent } from './components/course-detail/course-detail';
import { EnrollFormComponent } from './components/enroll-form/enroll-form';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { CourseReviewsComponent } from './components/course-reviews/course-reviews';
import { RelatedCoursesComponent } from './components/related-courses/related-courses';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'courses',
    component: CourseListComponent,
  },
  {
    // Course detail with child routes for reviews and related courses
    path: 'course/:id',
    component: CourseDetailComponent,
    children: [
      { path: '', redirectTo: 'reviews', pathMatch: 'full' },
      { path: 'reviews', component: CourseReviewsComponent },
      { path: 'related', component: RelatedCoursesComponent },
    ],
  },

  // Auth routes
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  // Protected routes - require authentication via authGuard
  {
    path: 'enroll/:id',
    component: EnrollFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: StudentDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'feedback/:id',
    component: FeedbackFormComponent,
    canActivate: [authGuard],
  },

  // Wildcard - redirect to home
  {
    path: '**',
    redirectTo: '',
  },
];
