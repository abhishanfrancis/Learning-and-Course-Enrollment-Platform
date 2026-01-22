import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  isLoading = true;
  isEnrolled = false;
  currentUserId = 1; // Assuming logged in user ID

  faqs = [
    {
      id: 1,
      question: 'What are the prerequisites for this course?',
      answer: 'This course is designed for beginners with basic knowledge of web development. No prior experience with this specific technology is required.',
      open: false,
    },
    {
      id: 2,
      question: 'Do I get a certificate after completing the course?',
      answer: 'Yes! Upon completing all modules and passing the final assessment, you will receive a downloadable certificate of completion.',
      open: false,
    },
    {
      id: 3,
      question: 'Can I download the course materials?',
      answer: 'Yes, all course materials including lecture notes, code examples, and resources are available for download.',
      open: false,
    },
    {
      id: 4,
      question: 'Is there lifetime access to the course?',
      answer: 'Absolutely! Once you enroll, you have lifetime access to all course content and future updates.',
      open: false,
    },
    {
      id: 5,
      question: 'How long do I have to complete the course?',
      answer: 'There is no time limit. You can complete the course at your own pace. Most students complete it in the indicated duration, but you can take longer if needed.',
      open: false,
    },
    {
      id: 6,
      question: 'What if I have questions during the course?',
      answer: 'We provide 24/7 Q&A support. You can post your questions in the course forum and our instructors or community members will help you.',
      open: false,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = params['id'];
      this.loadCourse(courseId);
    });
  }

  loadCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe((course) => {
      this.course = course;
      this.isLoading = false;
      if (course) {
        this.checkEnrollment(course.id);
      }
    });
  }

  checkEnrollment(courseId: number): void {
    this.studentService
      .isEnrolled(this.currentUserId, courseId)
      .subscribe((enrolled) => {
        this.isEnrolled = enrolled;
      });
  }

  getRatingPercentage(): number {
    if (!this.course) return 0;
    return (this.course.rating / 5) * 100;
  }

  getReviewCountByRating(rating: number): number {
    if (!this.course) return 0;
    return this.course.reviews.filter((r) => r.rating === rating).length;
  }

  getReviewPercentage(rating: number): number {
    if (!this.course || this.course.reviews.length === 0) return 0;
    const count = this.getReviewCountByRating(rating);
    return (count / this.course.reviews.length) * 100;
  }

  toggleFaq(id: number): void {
    const faq = this.faqs.find(f => f.id === id);
    if (faq) {
      faq.open = !faq.open;
    }
  }
}

