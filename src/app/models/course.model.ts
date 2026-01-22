export interface Instructor {
  id: number;
  name: string;
  email: string;
  bio: string;
  image: string;
  specialization: string;
}

export interface Review {
  id: number;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  duration: number; // in hours
  image: string;
  instructor: Instructor;
  enrolledStudents: number;
  rating: number;
  syllabus: string[];
  reviews: Review[];
  learningOutcomes: string[];
}
