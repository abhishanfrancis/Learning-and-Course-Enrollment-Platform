import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit {
  currentStudent: Student | null = null;
  isDropdownOpen = false;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentService.getCurrentStudent().subscribe((student) => {
      this.currentStudent = student;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.currentStudent = null;
    this.isDropdownOpen = false;
    this.router.navigate(['/']);
  }
}
