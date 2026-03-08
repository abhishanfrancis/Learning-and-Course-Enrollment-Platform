/**
 * HomeComponent - Landing page with hero, features, stats, and CTA sections.
 *
 * Now integrates UserService to personalize the CTA section
 * based on whether the user is logged in or not.
 */
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  features = [
    {
      icon: '📚',
      title: 'Extensive Course Library',
      description: 'Explore thousands of courses across various categories and skill levels'
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress tracking'
    },
    {
      icon: '🎓',
      title: 'Certificates',
      description: 'Earn recognized certificates upon course completion'
    },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Check authentication state to personalize CTA section
    this.userService.getCurrentUser$().subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }
}
