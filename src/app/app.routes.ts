import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { CourseListComponent } from './components/course-list/course-list';
import { CourseDetailComponent } from './components/course-detail/course-detail';
import { EnrollFormComponent } from './components/enroll-form/enroll-form';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'courses',
    component: CourseListComponent,
  },
  {
    path: 'course/:id',
    component: CourseDetailComponent,
  },
  {
    path: 'enroll/:id',
    component: EnrollFormComponent,
  },
  {
    path: 'dashboard',
    component: StudentDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
