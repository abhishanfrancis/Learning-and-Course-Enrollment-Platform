/**
 * EnrollmentDialogComponent - MatDialog for enrollment confirmation popup.
 *
 * Displays a confirmation dialog when a student successfully enrolls in a course.
 * Uses Angular Material MatDialog component.
 * Receives course data via MAT_DIALOG_DATA injection token.
 */
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


// Interface for the data passed to this dialog
export interface EnrollmentDialogData {
  courseTitle: string;
  courseInstructor: string;
  coursePrice: number;
}

@Component({
  selector: 'app-enrollment-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <!-- Enrollment Confirmation Dialog Template -->
    <div class="dialog-container">
      <div class="dialog-icon">
        <mat-icon>celebration</mat-icon>
      </div>

      <h2 mat-dialog-title>Enrollment Successful!</h2>

      <mat-dialog-content>
        <p>You have been successfully enrolled in:</p>
        <div class="course-info">
          <div class="info-row">
            <mat-icon>school</mat-icon>
            <span>{{ data.courseTitle }}</span>
          </div>
          <div class="info-row">
            <mat-icon>person</mat-icon>
            <span>{{ data.courseInstructor }}</span>
          </div>
          <div class="info-row">
            <mat-icon>payment</mat-icon>
            <span>\${{ data.coursePrice }}</span>
          </div>
        </div>
        <p class="congrats-text">Start learning today and track your progress on the dashboard!</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onClose()">Close</button>
        <button mat-raised-button color="primary" (click)="goToDashboard()">
          <mat-icon>dashboard</mat-icon>
          Go to Dashboard
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      text-align: center;
      padding: 10px;
    }

    .dialog-icon {
      margin-bottom: 10px;
    }

    .dialog-icon mat-icon {
      font-size: 56px;
      width: 56px;
      height: 56px;
      color: #4caf50;
    }

    h2 {
      font-size: 24px;
      font-weight: 700;
      color: #333;
      text-align: center;
    }

    .course-info {
      background: #f5f5f5;
      border-radius: 10px;
      padding: 15px;
      margin: 15px 0;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      color: #555;
      font-size: 14px;
    }

    .info-row mat-icon {
      color: #667eea;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .congrats-text {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
  `],
})
export class EnrollmentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EnrollmentDialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  goToDashboard(): void {
    this.dialogRef.close('dashboard');
  }
}
