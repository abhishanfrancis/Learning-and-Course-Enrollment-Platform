import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-enroll-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './enroll-form.html',
  styleUrl: './enroll-form.css',
})
export class EnrollFormComponent implements OnInit {
  enrollForm!: FormGroup;
  course: Course | undefined;
  currentUserId = 1;
  isSubmitting = false;
  enrollmentSuccess = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private studentService: StudentService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = params['id'];
      this.loadCourse(courseId);
    });
  }

  initializeForm(): void {
    this.enrollForm = this.fb.group({
      cardName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      agreeTerms: [false, Validators.requiredTrue],
    });
  }

  loadCourse(id: number): void {
    this.courseService.getCourseById(id).subscribe((course) => {
      this.course = course;
    });
  }

  get cardName() {
    return this.enrollForm.get('cardName');
  }

  get cardNumber() {
    return this.enrollForm.get('cardNumber');
  }

  get expiryDate() {
    return this.enrollForm.get('expiryDate');
  }

  get cvv() {
    return this.enrollForm.get('cvv');
  }

  get agreeTerms() {
    return this.enrollForm.get('agreeTerms');
  }

  onSubmit(): void {
    if (this.enrollForm.valid && this.course) {
      this.isSubmitting = true;
      this.errorMessage = '';

      this.studentService.enrollCourse(this.currentUserId, this.course.id).subscribe(
        () => {
          this.isSubmitting = false;
          this.enrollmentSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        (error) => {
          this.isSubmitting = false;
          this.errorMessage = 'Failed to enroll. Please try again.';
        }
      );
    }
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    this.enrollForm.patchValue({ cardNumber: value }, { emitEvent: false });
    event.target.value = formattedValue;
  }

  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.enrollForm.patchValue({ expiryDate: value }, { emitEvent: false });
    event.target.value = value;
  }
}

