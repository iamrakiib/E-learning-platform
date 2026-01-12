import axiosInstance, { createServerAxios } from './axios';

// ============================================
// Types
// ============================================
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor' | 'admin';
  bio?: string;
  profileImage?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration?: number;
  enrollmentCount: number;
  averageRating: number;
  reviewCount?: number;
  isPublished: boolean;
  instructor?: User;
  lessons?: Lesson[];
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  courseId: number;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  progress: number;
  completed: boolean;
  course?: Course;
  user?: User;
  enrolledAt: string;
  completedAt?: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  courseId: number;
  user?: User;
  createdAt: string;
}

export interface Notification {
  id: number;
  type: string;
  message: string;
  isRead: boolean;
  userId: number;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface DashboardStats {
  totalEnrollments: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHoursLearned: number;
  recentActivity: Array<{
    type: string;
    message: string;
    date: string;
  }>;
}

// ============================================
// Auth API (CSR) - Axios Call #1
// ============================================
export const authAPI = {
  // Login user
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },

  // Register user
  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
  }): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/register', {
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`,
      role: data.role || 'student',
    });
    return response.data;
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await axiosInstance.post('/auth/change-password', { currentPassword, newPassword });
  },
};

// ============================================
// Courses API (SSR + CSR) - Axios Call #2
// ============================================
export const coursesAPI = {
  // Get all courses with filters (SSR compatible)
  getAll: async (params?: {
    search?: string;
    category?: string;
    level?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
  }, token?: string): Promise<{ courses: Course[]; total: number }> => {
    const axios = token ? createServerAxios(token) : axiosInstance;
    const response = await axios.get('/courses', { params });
    // Handle both array and paginated response
    if (Array.isArray(response.data)) {
      return { courses: response.data, total: response.data.length };
    }
    return { courses: response.data.data || response.data, total: response.data.meta?.total || response.data.length };
  },

  // Get popular courses (SSR compatible)
  getPopular: async (token?: string): Promise<Course[]> => {
    const axios = token ? createServerAxios(token) : axiosInstance;
    const response = await axios.get('/courses/popular');
    return response.data;
  },

  // Get course by ID or slug (SSR compatible)
  getById: async (idOrSlug: string | number, token?: string): Promise<Course> => {
    const axios = token ? createServerAxios(token) : axiosInstance;
    const response = await axios.get(`/courses/${idOrSlug}`);
    return response.data;
  },

  // Get course reviews (CSR)
  getReviews: async (courseId: number): Promise<Review[]> => {
    const response = await axiosInstance.get(`/courses/${courseId}/reviews`);
    return response.data;
  },

  // Add review (CSR)
  addReview: async (courseId: number, rating: number, comment: string): Promise<Review> => {
    const response = await axiosInstance.post(`/courses/${courseId}/reviews`, { rating, comment });
    return response.data;
  },

  // Get course lessons (CSR - requires enrollment)
  getLessons: async (courseId: number): Promise<Lesson[]> => {
    const response = await axiosInstance.get(`/courses/${courseId}/lessons`);
    return response.data;
  },

  // Get single lesson
  getLesson: async (courseId: number, lessonId: number): Promise<Lesson> => {
    const response = await axiosInstance.get(`/courses/${courseId}/lessons/${lessonId}`);
    return response.data;
  },

  // Get categories
  getCategories: async (): Promise<string[]> => {
    const response = await axiosInstance.get('/courses/categories');
    return response.data;
  },
};

// ============================================
// Enrollments API (CSR) - Axios Call #3
// ============================================
export const enrollmentsAPI = {
  // Enroll in a course
  enroll: async (courseId: number): Promise<Enrollment> => {
    const response = await axiosInstance.post('/enrollments', { courseId });
    return response.data;
  },

  // Get my enrollments
  getMyEnrollments: async (): Promise<Enrollment[]> => {
    const response = await axiosInstance.get('/enrollments/my-courses');
    return response.data;
  },

  // Get enrollment stats
  getStats: async (): Promise<{ totalEnrollments: number; completedCount: number }> => {
    const response = await axiosInstance.get('/enrollments/stats');
    return response.data;
  },

  // Update lesson progress
  updateLessonProgress: async (lessonId: number, completed: boolean, timeSpent?: number): Promise<void> => {
    await axiosInstance.post(`/enrollments/lessons/${lessonId}/progress`, { completed, timeSpent });
  },

  // Check if enrolled in a course
  checkEnrollment: async (courseId: number): Promise<boolean> => {
    try {
      const enrollments = await enrollmentsAPI.getMyEnrollments();
      return enrollments.some(e => e.courseId === courseId);
    } catch {
      return false;
    }
  },
};

// ============================================
// Users API (CSR) - Axios Call #4
// ============================================
export const usersAPI = {
  // Get dashboard stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await axiosInstance.get('/users/dashboard');
    return response.data;
  },

  // Update profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.patch('/users/profile', data);
    return response.data;
  },

  // Get user by ID
  getById: async (id: number): Promise<User> => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },
};

// ============================================
// Notifications API (CSR) - Axios Call #5
// ============================================
export const notificationsAPI = {
  // Get all notifications
  getAll: async (): Promise<Notification[]> => {
    const response = await axiosInstance.get('/notifications');
    return response.data;
  },

  // Get unread count
  getUnreadCount: async (): Promise<number> => {
    const response = await axiosInstance.get('/notifications/unread-count');
    return response.data.count;
  },

  // Mark as read
  markAsRead: async (notificationId: number): Promise<void> => {
    await axiosInstance.patch(`/notifications/${notificationId}/read`);
  },

  // Mark all as read
  markAllAsRead: async (): Promise<void> => {
    await axiosInstance.patch('/notifications/read-all');
  },
};

// ============================================
// Chatbot API (CSR)
// ============================================
export const chatbotAPI = {
  // Get status
  getStatus: async (): Promise<{ configured: boolean; providers: string[] }> => {
    const response = await axiosInstance.get('/chatbot/status');
    return response.data;
  },

  // Send message
  sendMessage: async (message: string, sessionId?: string, courseId?: number): Promise<{
    message: { content: string; role: string };
    session: { id: string };
    sources?: Array<{ content: string; score: number }>;
  }> => {
    const response = await axiosInstance.post('/chatbot/chat', {
      message,
      sessionId,
      courseId,
    });
    return response.data;
  },

  // Get sessions
  getSessions: async (courseId?: number): Promise<Array<{ id: string; title: string }>> => {
    const response = await axiosInstance.get('/chatbot/sessions', {
      params: courseId ? { courseId } : {},
    });
    return response.data;
  },
};

// ============================================
// Admin API (CSR)
// ============================================
export const adminAPI = {
  // Get dashboard stats
  getDashboard: async (): Promise<{
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalRevenue: number;
    recentUsers: User[];
    recentEnrollments: Enrollment[];
  }> => {
    const response = await axiosInstance.get('/admin/dashboard');
    return response.data;
  },

  // Get all users
  getUsers: async (page = 1, limit = 10): Promise<PaginatedResponse<User>> => {
    const response = await axiosInstance.get('/admin/users', { params: { page, limit } });
    return response.data;
  },

  // Toggle user status
  toggleUserStatus: async (userId: number): Promise<User> => {
    const response = await axiosInstance.patch(`/admin/users/${userId}/toggle-status`);
    return response.data;
  },
};
