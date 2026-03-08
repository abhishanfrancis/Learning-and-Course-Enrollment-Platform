/**
 * NavbarComponent - Top navigation bar.
 *
 * Uses UserService for authentication state instead of StudentService.
 * Shows login/register buttons when logged out, and profile dropdown when logged in.
 * Uses Angular Material toolbar and icons for a polished UI.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { Student } from '../../models/student.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentStudent: Student | null = null;
  isDropdownOpen = false;
  private userSub!: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to the current user from UserService (reactive auth state)
    this.userSub = this.userService.getCurrentUser$().subscribe((user) => {
      this.currentStudent = user;
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    // Delegate logout to UserService and redirect to home
    this.userService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['/']);
  }
}
