# 📚 LearnHub - Learning and Course Enrollment Platform

A modern, feature-rich learning management platform built with Angular 21. Browse courses, enroll in programs, track your progress, and achieve your learning goals with an intuitive and responsive interface.

## 🚀 Live Preview

**[View Live Demo](https://learning-and-course-enrollment-plat.vercel.app/)** 

---

## ✨ Features

### For Students
- **Course Catalog** - Browse through a wide variety of courses with advanced filtering by category, level, and price
- **Detailed Course Pages** - View comprehensive course information including syllabus, instructor details, reviews, and FAQs
- **Student Dashboard** - Track enrolled courses, monitor progress, and view completion statistics
- **Progress Tracking** - Real-time progress updates with visual progress bars and completion percentages
- **Course Reviews** - Read student testimonials and ratings before enrolling

### Course Management
- **Multiple Course Levels** - Beginner, Intermediate, and Advanced courses
- **Rich Course Details** - Instructor profiles, learning outcomes, duration, and pricing
- **Interactive FAQ Section** - Expandable/collapsible frequently asked questions
- **Enrollment System** - Simple course enrollment with form validation
- **Certificate Tracking** - Monitor certificate eligibility and achievements

### User Experience
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Modern UI** - Clean, gradient-based design with smooth animations
- **User Profiles** - Personalized dashboard with profile management
- **Image Support** - Course thumbnails and instructor profile pictures

---

## 🛠️ Tech Stack

- **Framework**: Angular 21.1.1
- **Language**: TypeScript
- **Styling**: CSS3 with custom animations
- **Routing**: Angular Router with lazy loading
- **State Management**: RxJS Observables
- **Forms**: Angular Reactive Forms

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI 21.1.1

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhishanfrancis/Learning-and-Course-Enrollment-Platform.git
   cd learning-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200/`

---

## 📂 Project Structure

```
learning-platform/
├── src/
│   ├── app/
│   │   ├── components/          # Feature components
│   │   │   ├── course-list/     # Browse courses
│   │   │   ├── course-detail/   # Course information
│   │   │   ├── enroll-form/     # Enrollment form
│   │   │   ├── home/            # Landing page
│   │   │   ├── navbar/          # Navigation bar
│   │   │   └── student-dashboard/ # Student progress
│   │   ├── models/              # TypeScript interfaces
│   │   │   ├── course.model.ts
│   │   │   └── student.model.ts
│   │   ├── services/            # Business logic
│   │   │   ├── course.service.ts
│   │   │   └── student.service.ts
│   │   └── app.routes.ts        # Route configuration
│   ├── assets/                  # Images and static files
│   └── styles.css              # Global styles
└── package.json
```

---

## 🎯 Key Pages

### Home Page (`/`)
Welcome page with featured courses and call-to-action buttons

### Courses Page (`/courses`)
- Course grid with filtering options
- Filter by category, level, and price range
- Real-time course count display

### Course Detail Page (`/course/:id`)
- Complete course information
- Detailed syllabus breakdown
- Student reviews and ratings
- FAQ section with expandable answers
- Enrollment call-to-action

### Student Dashboard (`/dashboard`)
- Active courses tab
- Completed courses tab
- Progress tracking
- Quick access to continue learning

### Enrollment Form (`/enroll/:id`)
- Student information collection
- Payment card details
- Form validation

---

## 🎨 Features Showcase

### Advanced Filtering
Filter courses by:
- Category (Web Development, Programming, UI/UX)
- Difficulty Level (Beginner, Intermediate, Advanced)
- Price Range (Dynamic slider)

### Progress Tracking
- Visual progress bars
- Percentage completion
- Last accessed dates
- Certificate status

### Interactive FAQ
- Expandable question panels
- Smooth animations
- Comprehensive course information

---

## 🚀 Available Scripts

### Development
```bash
ng serve              # Start dev server
ng serve --open       # Start and open browser
```

### Build
```bash
ng build              # Production build
ng build --watch      # Development build with watch
```

### Code Generation
```bash
ng generate component component-name
ng generate service service-name
ng generate module module-name
```

### Testing
```bash
ng test               # Run unit tests
ng e2e                # Run end-to-end tests
```

---

## 📊 Course Data

Currently includes **6 courses** covering:
- Angular Fundamentals
- Advanced TypeScript
- Reactive Programming with RxJS
- Material Design with Angular
- Full Stack Development
- Web Performance Optimization

---

## 👤 Author

**Abhishan Francis**

- GitHub: [@abhishanfrancis](https://github.com/abhishanfrancis)
- Project: [Learning-and-Course-Enrollment-Platform](https://github.com/abhishanfrancis/Learning-and-Course-Enrollment-Platform)

---

## 📝 License

This project is available for educational and portfolio purposes.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---
<!--
## 📸 Screenshots

*Add your application screenshots here after deployment*

---
-->
## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Placeholder image services for demo images
- Material Design for UI inspiration

---

**Made with ❤️ using Angular**
