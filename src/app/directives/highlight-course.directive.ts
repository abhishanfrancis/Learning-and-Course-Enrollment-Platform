/**
 * Custom Directives for Highlighting Courses
 *
 * HighlightTrendingDirective - Highlights courses marked as trending.
 *   Usage: <div [appHighlightTrending]="course.isTrending">
 *   Behavior: Applies a gold/orange highlighted border and subtle glow effect.
 *
 * HighlightNewDirective - Highlights newly added courses.
 *   Usage: <div [appHighlightNew]="course.isNew">
 *   Behavior: Applies a green highlighted background/badge effect
 *   and adds a "NEW" badge via CSS ::after pseudo-element.
 */
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

/**
 * HighlightTrendingDirective
 *
 * When applied to an element with [appHighlightTrending]="true",
 * it adds a distinctive border and box-shadow to indicate a trending course.
 *
 * Example:
 *   <mat-card [appHighlightTrending]="course.isTrending">
 */
@Directive({
  selector: '[appHighlightTrending]',
  standalone: true,
})
export class HighlightTrendingDirective implements OnChanges {
  @Input() appHighlightTrending = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighlightTrending']) {
      this.updateHighlight();
    }
  }

  /**
   * Apply or remove the trending highlight styles based on the input value.
   */
  private updateHighlight(): void {
    if (this.appHighlightTrending) {
      // Add a gold/orange border to indicate the course is trending
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #ff9800');
      // Add a subtle glow effect
      this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0 12px rgba(255, 152, 0, 0.3)');
      // Set position relative for potential badge overlay
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
      // Add a CSS class for additional custom styling
      this.renderer.addClass(this.el.nativeElement, 'trending-course');
    } else {
      // Remove trending styles when flag is false
      this.renderer.removeStyle(this.el.nativeElement, 'border');
      this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
      this.renderer.removeClass(this.el.nativeElement, 'trending-course');
    }
  }
}

/**
 * HighlightNewDirective
 *
 * When applied to an element with [appHighlightNew]="true",
 * it adds a green-themed background tint and distinguishing style
 * to indicate the course is newly added.
 *
 * Example:
 *   <mat-card [appHighlightNew]="course.isNew">
 */
@Directive({
  selector: '[appHighlightNew]',
  standalone: true,
})
export class HighlightNewDirective implements OnChanges {
  @Input() appHighlightNew = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighlightNew']) {
      this.updateHighlight();
    }
  }

  /**
   * Apply or remove the new-course highlight styles based on the input value.
   */
  private updateHighlight(): void {
    if (this.appHighlightNew) {
      // Add a green border to indicate the course is new
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #4caf50');
      // Add a subtle green background tint
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f1f8e9');
      // Set position relative for the "NEW" badge pseudo-element
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
      // Add overflow visible so the badge can extend outside the element
      this.renderer.setStyle(this.el.nativeElement, 'overflow', 'visible');
      // Add a CSS class for the "NEW" badge pseudo-element styling
      this.renderer.addClass(this.el.nativeElement, 'new-course');
    } else {
      // Remove new-course styles when flag is false
      this.renderer.removeStyle(this.el.nativeElement, 'border');
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeClass(this.el.nativeElement, 'new-course');
    }
  }
}
