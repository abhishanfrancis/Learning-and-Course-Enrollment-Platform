# LearnHub - Learning and Course Enrollment Platform

A comprehensive Learning Management System (LMS) built with **Angular 17** and **TypeScript**. This platform enables students to browse courses, view instructor details, enroll in programs, and track their learning progress through a modern, responsive single-page application.

## 🌟 Features

### 1. **Course Management**
- Browse extensive course library with filters
- Advanced filtering by category, difficulty level, and price
- Detailed course pages with syllabi, reviews, and learning outcomes
- Course ratings and student reviews
- Instructor information and expertise

### 2. **Student Dashboard**
- Personalized learning dashboard
- Track enrolled courses and progress
- View completion percentages for each course
- Separate tabs for active and completed courses
- Download certificates for completed courses

### 3. **Enrollment System**
- Secure enrollment form with payment processing
- Form validation and error handling
- Real-time enrollment confirmation
- Automatic redirection to dashboard after enrollment

### 4. **Responsive Design**
- Mobile-first approach
- Beautiful gradient UI with modern aesthetics
- Smooth animations and transitions
- Cross-browser compatible

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Angular | 17+ | Frontend framework |
| TypeScript | Latest | Type-safe programming language |
| Angular Material | Latest | UI components (extensible) |
| RxJS | Latest | Reactive programming |
| CSS3 | Latest | Styling with gradients and animations |
| Node.js | 18+ | Runtime environment |

### Additional Technologies (New)

| Technology | Version | Purpose |
|-----------|---------|---------|
| @angular/animations | 21.1.1 | Animation support for Material components |
| Angular HttpClient | 21.1.1 | HTTP requests to mock JSON endpoints |
| Functional Guards | — | CanActivateFn for route protection |
| Functional Interceptors | — | HttpInterceptorFn for global error handling |
| BehaviorSubject (RxJS) | 7.8.0 | Reactive state management in services |

## 📁 Project Structure

```
learning-platform/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/              # Navigation component
│   │   │   ├── home/                # Landing page
│   │   │   ├── course-list/         # Course listing with filters
│   │   │   ├── course-detail/       # Detailed course view
│   │   │   ├── enroll-form/         # Enrollment form
│   │   │   └── student-dashboard/   # Student progress dashboard
│   │   ├── models/
│   │   │   ├── course.model.ts      # Course interface
│   │   │   └── student.model.ts     # Student interface
│   │   ├── services/
│   │   │   ├── course.service.ts    # Course data management
│   │   │   └── student.service.ts   # Student data management
│   │   ├── app.routes.ts            # Application routes
│   │   ├── app.ts                   # Root component
│   │   └── app.css                  # Global styles
│   ├── styles.css                   # Global stylesheet
│   ├── main.ts                      # Entry point
│   └── index.html                   # HTML template
├── package.json                     # Dependencies
├── angular.json                     # Angular configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

### New Additions to Project Structure

```
src/app/
├── components/
│   ├── login/                       # Login (template-driven form, demo quick-fill)
│   │   ├── login.ts
│   │   ├── login.html
│   │   └── login.css
│   ├── register/                    # Registration (template-driven form)
│   │   ├── register.ts
│   │   ├── register.html
│   │   └── register.css
│   ├── course-reviews/              # Child route: course reviews
│   │   ├── course-reviews.ts
│   │   ├── course-reviews.html
│   │   └── course-reviews.css
│   ├── related-courses/             # Child route: related courses
│   │   ├── related-courses.ts
│   │   ├── related-courses.html
│   │   └── related-courses.css
│   ├── feedback-form/               # Feedback (reactive form with star rating)
│   │   ├── feedback-form.ts
│   │   ├── feedback-form.html
│   │   └── feedback-form.css
│   └── enrollment-dialog/           # MatDialog enrollment confirmation
│       └── enrollment-dialog.ts
├── guards/
│   └── auth.guard.ts                # Functional CanActivateFn route guard
├── interceptors/
│   └── http-error.interceptor.ts    # Functional HttpInterceptorFn
├── pipes/
│   └── course-filter.pipe.ts        # CourseFilterPipe, CourseLevelPipe, CourseDurationPipe
├── directives/
│   └── highlight-course.directive.ts # HighlightTrendingDirective, HighlightNewDirective
└── services/
    ├── user.service.ts              # Authentication & user management
    └── enrollment.service.ts        # Enrollment CRUD & progress tracking

public/data/
├── courses.json                     # Mock course data (6 courses)
├── students.json                    # Mock user data (2 demo users)
└── enrollments.json                 # Mock enrollment records
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (v17 or higher)

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd learning-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve --open
   ```

4. **Open in browser:**
   The application will automatically open at `http://localhost:4200`

### Build for Production

```bash
npm run build
# or
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 📖 Usage Guide

### Home Page
- Features overview and platform statistics
- Quick navigation to courses
- Call-to-action buttons for enrollment

### Course Listing
- **Filters:**
  - By Category (Web Development, Programming, UI/UX, etc.)
  - By Level (Beginner, Intermediate, Advanced)
  - By Price (Range slider)
- View course cards with:
  - Course image
  - Title and description
  - Instructor information
  - Duration and enrollment count
  - Rating and price
- "View Details" button for full course information
- "Enroll Now" button (when logged in)

### Course Details
- **Course Information:**
  - Hero section with course overview
  - Instructor profile
  - Learning outcomes
  - Syllabus
  - Student reviews and ratings
- **Enrollment:**
  - View pricing
  - Enroll in course (if not already enrolled)
- **Sidebar:**
  - Course statistics
  - Features included
  - Enrollment options

### Login Page
- **Demo User Quick-Fill:**
  - One-click buttons for Roy Joseph and Jane Smith
  - Auto-populates email and password fields
- **Template-Driven Form:**
  - Email validation (required, email format)
  - Password validation (required, minlength 6)
  - Password visibility toggle
- **Error Handling:**
  - Inline error messages per field
  - Login error banner for invalid credentials
- **Post-Login:**
  - MatSnackBar success notification
  - Redirect to returnUrl (set by AuthGuard)

### Register Page
- **Template-Driven Form:**
  - Name, email, phone, password fields
  - Password strength indicator
- **Post-Register:**
  - Redirect to login page

### Course Reviews (Child Route)
- Accessed via tab on Course Detail page (`/course/:id/reviews`)
- Rating summary with average score
- Individual review cards with reviewer name, rating, and comment

### Related Courses (Child Route)
- Accessed via tab on Course Detail page (`/course/:id/related`)
- Courses filtered by same category
- Course cards with quick links

### Feedback Form
- **Reactive Form (FormBuilder + Validators):**
  - Title, message, star rating (1–5)
  - Required field validation
- **Protected by AuthGuard**
- MatSnackBar confirmation on submit

### Enrollment Dialog
- MatDialog confirmation popup on successful enrollment
- Displays course title, instructor, and price
- Buttons to close or navigate to dashboard

### Enrollment Form
- **Payment Information:**
  - Cardholder name
  - Card number (formatted)
  - Expiry date (MM/YY format)
  - CVV
- **Terms Acceptance:**
  - Agree to terms and privacy policy
- **Validation:**
  - Real-time form validation
  - Clear error messages
- **Confirmation:**
  - Success message upon enrollment
  - Auto-redirect to dashboard

### Student Dashboard
- **Profile Section:**
  - Student name and avatar
  - Member since date
  - Statistics (courses, completed, average progress)
- **Active Courses Tab:**
  - Progress bars for each course
  - Last accessed information
  - "Continue Learning" button
  - Quick access to course details
- **Completed Courses Tab:**
  - Certificate availability
  - Review/revisit courses
  - Download certificates

## 🎨 Design Features

### Color Scheme
- **Primary Gradient:** #667eea → #764ba2 (Purple gradient)
- **Background:** Light gradient (f5f7fa → c3cfe2)
- **Accent Colors:** Various gradients for different states

### Animations
- Smooth transitions on hover
- Floating animation for hero illustration
- Slide-down menu animation
- Progress bar animations

### Typography
- Clean, modern sans-serif fonts
- Hierarchical sizing
- Responsive text sizes

## 🔧 Core Components

### Navbar Component
Navigation header with:
- Brand logo
- Navigation menu (Home, Courses, Dashboard)
- Student profile dropdown
- Login/Signup buttons

### Course List Component
- Grid layout with responsive design
- Sidebar filters
- Course cards with filtering logic
- Statistics display

### Course Detail Component
- Comprehensive course information
- Instructor details
- Reviews and ratings system
- Enrollment tracking

### Enroll Form Component
- Reactive forms with validation
- Payment form with formatting
- Success confirmation screen
- Error handling

### Student Dashboard Component
- Personal learning hub
- Progress tracking
- Tab-based interface
- Course management

### New Components

### Login Component
- Template-driven form with `FormsModule` and `#ngForm`
- Demo user quick-fill buttons for instant testing
- Password visibility toggle
- Integrates with `UserService` for authentication

### Register Component
- Template-driven registration form
- Password strength indicator
- Integrates with `UserService.register()`

### Course Reviews Component
- Child route component for `/course/:id/reviews`
- Displays rating summary and individual reviews
- Uses `CourseService` to load review data

### Related Courses Component
- Child route component for `/course/:id/related`
- Filters courses by same category
- Material card layout with navigation links

### Feedback Form Component
- Reactive form using `FormBuilder` and `Validators`
- Star rating selector (1–5 stars)
- Protected by `authGuard`

### Enrollment Dialog Component
- `MatDialog`-based confirmation popup
- Receives course data via `MAT_DIALOG_DATA` injection
- Inline template and styles (self-contained)

## 📦 Services

### CourseService
```typescript
- getCourses(): Observable<Course[]>
- getCourseById(id: number): Observable<Course>
- filterCourses(category, level, price): Observable<Course[]>
- getCategories(): string[]
- getLevels(): string[]
```

### StudentService
```typescript
- getCurrentStudent(): Observable<Student>
- enrollCourse(studentId, courseId): Observable<Enrollment>
- getEnrollments(studentId): Observable<Enrollment[]>
- isEnrolled(studentId, courseId): Observable<boolean>
- getStudentProgress(studentId, courses): Observable<StudentProgress[]>
- updateEnrollmentProgress(enrollmentId, percentage): Observable<boolean>
```

### UserService (New)
```typescript
- login(email, password): Observable<boolean>
- logout(): void
- register(student): Observable<boolean>
- getCurrentUser$(): Observable<Student | null>
- isLoggedIn(): boolean
- updateProfile(student): Observable<boolean>
```

### EnrollmentService (New)
```typescript
- enrollStudent(studentId, courseId): Observable<Enrollment>
- getStudentEnrollments(studentId): Observable<Enrollment[]>
- isEnrolled(studentId, courseId): Observable<boolean>
- getStudentProgress(studentId, courses): Observable<StudentProgress[]>
- updateProgress(enrollmentId, percentage): Observable<boolean>
```

## 📊 Data Models

### Course Model
```typescript
interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  duration: number;
  image: string;
  instructor: Instructor;
  enrolledStudents: number;
  rating: number;
  syllabus: string[];
  reviews: Review[];
  learningOutcomes: string[];
}
```

### Student Model
```typescript
interface Student {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage: string;
  joinDate: string;
}
```

> **Note:** The `Course` model has been extended with the following new fields:
> ```typescript
> isTrending: boolean;   // Highlighted with gold border via HighlightTrendingDirective
> isNew: boolean;        // Highlighted with green border via HighlightNewDirective
> createdDate: string;   // ISO date string for new course detection
> ```

### Enrollment Model
```typescript
interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: string;
  completionPercentage: number;
  lastAccessedDate: string;
  status: 'Active' | 'Completed' | 'Dropped';
  certificateObtained: boolean;
}
```

## 🔐 Data Management

The application uses:
- **Reactive Programming:** RxJS Observables for data flow
- **Services:** Centralized data management
- **Mock Data:** Static JSON data for demonstration
- **State Management:** BehaviorSubjects for reactive state

## 🎓 Learning Concepts Covered

This project demonstrates:

1. **Angular Components**
   - Standalone components
   - Component lifecycle
   - Data binding (interpolation, property, event)
   - Template syntax

2. **TypeScript**
   - Interfaces and types
   - Classes
   - Generics
   - Type safety

3. **Routing**
   - Route configuration
   - Route parameters
   - Navigation

4. **Reactive Programming**
   - RxJS Observables
   - Operators (map, filter)
   - Subscriptions

5. **Forms**
   - Reactive forms
   - Form validation
   - Custom validators

6. **CSS**
   - CSS Grid and Flexbox
   - Gradients
   - Animations
   - Responsive design

### Additional Concepts (New)

7. **Authentication & Guards**
   - Functional `CanActivateFn` route guard
   - Login/Register flow with template-driven forms
   - Return URL handling for post-login redirect

8. **HTTP Client & Interceptors**
   - `HttpClient` for fetching mock JSON data
   - Functional `HttpInterceptorFn` for global error handling
   - `provideHttpClient(withInterceptors([...]))` configuration

9. **Custom Pipes**
   - Pure pipes for template-driven filtering
   - `CourseFilterPipe`, `CourseLevelPipe`, `CourseDurationPipe`
   - Used directly in `*ngFor` expressions

10. **Custom Directives**
    - Attribute directives for visual highlighting
    - `HostBinding` and `Input` decorators
    - `HighlightTrendingDirective`, `HighlightNewDirective`

11. **Angular Material**
    - MatDialog with `MAT_DIALOG_DATA` injection
    - MatSnackBar for toast notifications
    - MatTable with `displayedColumns` binding
    - MatProgressBar (determinate & indeterminate modes)
    - `provideAnimationsAsync()` for performance

12. **State Management with BehaviorSubject**
    - `BehaviorSubject` caching in services
    - `getCurrentUser$()` observable pattern
    - Reactive enrollment tracking

## 📱 Responsive Breakpoints

- **Desktop:** 1200px and above
- **Tablet:** 768px - 1199px
- **Mobile:** Below 768px

## 🚀 Deployment

### Build
```bash
ng build --configuration production
```

### Deploy Options
1. **Firebase Hosting**
2. **Netlify**
3. **Vercel**
4. **GitHub Pages**
5. **Traditional web server (Apache, Nginx)**

## 🤝 Contributing

1. Follow Angular style guide
2. Use TypeScript strictly
3. Write meaningful commit messages
4. Test components thoroughly
5. Maintain responsive design

## 📝 Future Enhancements

- ~~User authentication system~~ ✅ Implemented (login/register with mock data)
- Database integration (Firebase/MongoDB)
- Real payment gateway integration
- Video player for course content
- Discussion forums
- Progress notifications
- Achievement badges
- Instructor dashboard
- Analytics and reporting
- Mobile app (React Native/Flutter)

## 🐛 Known Limitations

- Mock data only (no backend)
- No persistent storage
- No real payment processing
- No email notifications
- Limited course content

## 📄 License

This project is provided as-is for educational purposes.

## 🙏 Acknowledgments

- Angular team for the excellent framework
- TypeScript team for type safety
- Community for best practices and inspiration

## 📞 Support

For questions or issues, refer to:
- [Angular Documentation](https://angular.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)

---

## 🔀 Routing Architecture (New)

```
/                       → HomeComponent (public)
/courses                → CourseListComponent (public)
/course/:id             → CourseDetailComponent (public)
  /course/:id/reviews     → CourseReviewsComponent (child route)
  /course/:id/related     → RelatedCoursesComponent (child route)
/login                  → LoginComponent (public)
/register               → RegisterComponent (public)
/dashboard              → StudentDashboardComponent (🔒 authGuard)
/enroll/:id             → EnrollFormComponent (🔒 authGuard)
/feedback/:id           → FeedbackFormComponent (🔒 authGuard)
```

---

## 🧪 Demo Credentials

| User | Email | Password |
|------|-------|----------|
| Roy Joseph | roy@example.com | password123 |
| Jane Smith | jane@example.com | password456 |

> **Tip:** Use the **quick-fill buttons** on the login page to auto-populate credentials instantly.

---

## 🛡️ Guards & Interceptors (New)

### AuthGuard (`auth.guard.ts`)
- Functional `CanActivateFn` pattern
- Checks `UserService.isLoggedIn()` before allowing access
- Redirects to `/login` with `returnUrl` query parameter

### HTTP Error Interceptor (`http-error.interceptor.ts`)
- Functional `HttpInterceptorFn` pattern
- Catches all HTTP errors via RxJS `catchError`
- Displays `MatSnackBar` notifications with status-specific messages:
  - `0` — No internet connection
  - `400` — Bad request
  - `401` — Unauthorized (redirects to login)
  - `403` — Forbidden
  - `404` — Resource not found
  - `500` — Server error

---

## 🧩 Custom Pipes & Directives (New)

### Pipes (`course-filter.pipe.ts`)

| Pipe | Usage | Description |
|------|-------|-------------|
| `courseFilter` | `courses \| courseFilter:'Web Development'` | Filter by category |
| `courseLevel` | `courses \| courseLevel:'Beginner'` | Filter by difficulty level |
| `courseDuration` | `courses \| courseDuration:20` | Filter by max duration (hours) |

### Directives (`highlight-course.directive.ts`)

| Directive | Usage | Description |
|-----------|-------|-------------|
| `appHighlightTrending` | `[appHighlightTrending]="course.isTrending"` | Gold border on trending courses |
| `appHighlightNew` | `[appHighlightNew]="course.isNew"` | Green border on new courses |

---

**Built with ❤️ using Angular and TypeScript**
