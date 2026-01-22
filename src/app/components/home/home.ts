import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
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
}
