import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  categories: string[] = [];
  levels: string[] = [];
  currentStudent: Student | null = null;

  // Filter properties
  selectedCategory = 'All';
  selectedLevel = 'All';
  maxPrice = 100;

  constructor(
    private courseService: CourseService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadCategories();
    this.loadLevels();
    this.loadCurrentStudent();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      this.applyFilters();
    });
  }

  loadCategories(): void {
    this.categories = ['All', ...this.courseService.getCategories()];
  }

  loadLevels(): void {
    this.levels = ['All', ...this.courseService.getLevels()];
  }

  loadCurrentStudent(): void {
    this.studentService.getCurrentStudent().subscribe((student) => {
      this.currentStudent = student;
    });
  }

  applyFilters(): void {
    this.courseService
      .filterCourses(
        this.selectedCategory === 'All' ? undefined : this.selectedCategory,
        this.selectedLevel === 'All' ? undefined : this.selectedLevel,
        this.maxPrice
      )
      .subscribe((filtered) => {
        this.filteredCourses = filtered;
      });
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onLevelChange(): void {
    this.applyFilters();
  }

  onPriceChange(): void {
    this.applyFilters();
  }

  isEnrolled(courseId: number): boolean {
    if (!this.currentStudent) return false;
    // Check if student is enrolled in this course
    // This would need to be implemented with actual enrollment checking
    return false;
  }
}
