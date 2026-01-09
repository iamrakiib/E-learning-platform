// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: 'student' | 'instructor' | 'admin';
  isActive?: boolean;
  bio?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt?: string;
}

// Admin Dashboard Types
export interface AdminDashboardStats {
  overview: {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalRevenue: string;
    activeUsers: number;
    activeCourses: number;
  };
  recentEnrollments: Enrollment[];
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pageCount: number;
  };
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  duration?: number;
  thumbnail?: string;
  instructor?: { id: number; name: string; email: string } | string;
  instructorId?: number;
  instructorUser?: User;
  lessons?: Lesson[];
  reviews?: Review[];
  enrollmentCount?: number;
  averageRating?: number;
  lessonCount?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  status?: 'draft' | 'pending_review' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  description?: string;
  duration: number;
  order: number;
  videoUrl?: string;
  courseId: number;
}

export interface LessonProgress {
  id: number;
  lessonId: number;
  lessonTitle?: string;
  completed: boolean;
  watchedDuration: number;
  lastWatched: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  user?: User;
  courseId: number;
  createdAt: string;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  progress: number;
  status?: string;
  enrolledAt: string;
  completedAt?: string;
  course?: Course;
  lessonProgress?: LessonProgress[];
}

export interface DashboardStats {
  totalEnrollments: number;
  inProgress: number;
  completed: number;
  totalLearningHours?: number;
  totalHours?: number;
}

export interface InstructorDashboard {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  recentEnrollments: number;
  courses: Course[];
}

export interface Notification {
  id: number;
  type: 'enrollment' | 'review' | 'course_approved' | 'course_rejected' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Helper function to get auth token
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

// Helper function to get or generate a client ID for anonymous chatbot access
export function getClientId(): string {
  if (typeof window === 'undefined') return '';
  
  let clientId = localStorage.getItem('chatbot_client_id');
  if (!clientId) {
    // Generate a UUID-like client ID
    clientId = 'client_' + crypto.randomUUID();
    localStorage.setItem('chatbot_client_id', clientId);
  }
  return clientId;
}

// Helper function to set auth headers
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Helper function to get chatbot headers (includes clientId for anonymous access)
export function getChatbotHeaders(): HeadersInit {
  const token = getAuthToken();
  const clientId = getClientId();
  return {
    'Content-Type': 'application/json',
    'x-client-id': clientId,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Error handling helper
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}
