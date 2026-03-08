/**
 * Custom Pipes for Course Filtering
 *
 * CourseFilterPipe - Filters courses by category
 *   Usage: courses | courseFilter:'Web Development'
 *
 * CourseLevelPipe - Filters courses by difficulty level
 *   Usage: courses | courseLevel:'Beginner'
 *
 * CourseDurationPipe - Filters courses by maximum duration
 *   Usage: courses | courseDuration:20
 *
 * These pipes are pure by default, meaning they only re-evaluate
 * when the input reference or arguments change.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.model';

/**
 * CourseFilterPipe - Filter courses by category name.
 *
 * Example usage in template:
 *   <div *ngFor="let course of courses | courseFilter:'Web Development'">
 *
 * Pass 'All' or empty string to return all courses (no filter).
 */
@Pipe({
  name: 'courseFilter',
  standalone: true,
  pure: true,
})
export class CourseFilterPipe implements PipeTransform {
  transform(courses: Course[], category: string): Course[] {
    // Return all courses if no category filter is specified
    if (!category || category === 'All' || category === '') {
      return courses;
    }
    // Filter courses matching the specified category (case-insensitive)
    return courses.filter(
      (course) => course.category.toLowerCase() === category.toLowerCase()
    );
  }
}

/**
 * CourseLevelPipe - Filter courses by difficulty level.
 *
 * Example usage in template:
 *   <div *ngFor="let course of courses | courseLevel:'beginner'">
 *
 * Accepts 'Beginner', 'Intermediate', or 'Advanced'.
 * Pass 'All' or empty string to return all courses.
 */
@Pipe({
  name: 'courseLevel',
  standalone: true,
  pure: true,
})
export class CourseLevelPipe implements PipeTransform {
  transform(courses: Course[], level: string): Course[] {
    // Return all courses if no level filter is specified
    if (!level || level === 'All' || level === '') {
      return courses;
    }
    // Filter courses matching the specified level (case-insensitive)
    return courses.filter(
      (course) => course.level.toLowerCase() === level.toLowerCase()
    );
  }
}

/**
 * CourseDurationPipe - Filter courses by maximum duration in hours.
 *
 * Example usage in template:
 *   <div *ngFor="let course of courses | courseDuration:25">
 *
 * Returns courses with duration <= the specified maximum.
 * Pass 0 or null to return all courses.
 */
@Pipe({
  name: 'courseDuration',
  standalone: true,
  pure: true,
})
export class CourseDurationPipe implements PipeTransform {
  transform(courses: Course[], maxDuration: number): Course[] {
    // Return all if no max duration specified or zero
    if (!maxDuration || maxDuration <= 0) {
      return courses;
    }
    // Filter courses within the maximum duration
    return courses.filter((course) => course.duration <= maxDuration);
  }
}
