export interface Student {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage: string;
  joinDate: string;
}

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: string;
  completionPercentage: number;
  lastAccessedDate: string;
  status: 'Active' | 'Completed' | 'Dropped';
  certificateObtained: boolean;
}

export interface StudentProgress {
  enrollmentId: number;
  courseId: number;
  courseName: string;
  completionPercentage: number;
  status: 'Active' | 'Completed' | 'Dropped';
  lastAccessed: string;
  instructor: string;
}
