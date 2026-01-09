import { 
  API_BASE_URL, 
  getAuthHeaders, 
  getChatbotHeaders,
  AuthResponse, 
  User, 
  Course, 
  Enrollment, 
  DashboardStats,
  Lesson,
  LessonProgress,
  Review,
  InstructorDashboard,
  Notification,
  ApiError,
  AdminDashboardStats,
  PaginatedResult
} from './api-types';

// Generic API request helper with better error handling
async function apiRequest<T>(
  url: string, 
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `Request failed with status ${response.status}`,
        response.status
      );
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Network error. Please check your connection.', 0);
  }
}

// Auth API
export const authApi = {
  async register(email: string, password: string, name: string, role: string = 'student'): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role }),
    });
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return apiRequest(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  async getProfile(): Promise<User> {
    return apiRequest<User>(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders(),
    });
  },
};

// Courses API
export const coursesApi = {
  async getAll(params?: {
    search?: string;
    category?: string;
    level?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Course[]> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.level) queryParams.append('level', params.level);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());

    const url = `${API_BASE_URL}/courses${queryParams.toString() ? `?${queryParams}` : ''}`;
    return apiRequest<Course[]>(url);
  },

  async getPopular(): Promise<Course[]> {
    return apiRequest<Course[]>(`${API_BASE_URL}/courses/popular`);
  },

  async getById(id: number): Promise<Course> {
    return apiRequest<Course>(`${API_BASE_URL}/courses/${id}`);
  },

  async getDetailed(id: number): Promise<Course> {
    return apiRequest<Course>(`${API_BASE_URL}/courses/detailed/${id}`, {
      headers: getAuthHeaders(),
    });
  },

  async create(courseData: Partial<Course>): Promise<Course> {
    return apiRequest<Course>(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData),
    });
  },

  async update(id: number, courseData: Partial<Course>): Promise<Course> {
    return apiRequest<Course>(`${API_BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData),
    });
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`${API_BASE_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },

  // Lessons
  async getLessons(courseId: number): Promise<Lesson[]> {
    return apiRequest<Lesson[]>(`${API_BASE_URL}/courses/${courseId}/lessons`);
  },

  async getLesson(courseId: number, lessonId: number): Promise<Lesson> {
    return apiRequest<Lesson>(`${API_BASE_URL}/courses/${courseId}/lessons/${lessonId}`);
  },

  async createLesson(courseId: number, lessonData: Partial<Lesson>): Promise<Lesson> {
    return apiRequest<Lesson>(`${API_BASE_URL}/courses/${courseId}/lessons`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(lessonData),
    });
  },

  async deleteLesson(courseId: number, lessonId: number): Promise<void> {
    return apiRequest<void>(`${API_BASE_URL}/courses/${courseId}/lessons/${lessonId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },

  // Reviews
  async getReviews(courseId: number): Promise<Review[]> {
    try {
      return await apiRequest<Review[]>(`${API_BASE_URL}/courses/${courseId}/reviews`);
    } catch {
      return []; // Return empty array if endpoint doesn't exist
    }
  },

  async addReview(courseId: number, data: { rating: number; comment: string }): Promise<Review> {
    return apiRequest<Review>(`${API_BASE_URL}/courses/${courseId}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },

  async updateReview(courseId: number, reviewId: number, data: { rating?: number; comment?: string }): Promise<Review> {
    return apiRequest<Review>(`${API_BASE_URL}/courses/${courseId}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },

  async deleteReview(courseId: number, reviewId: number): Promise<void> {
    return apiRequest<void>(`${API_BASE_URL}/courses/${courseId}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },

  // Instructor endpoints
  async getMyCourses(): Promise<Course[]> {
    return apiRequest<Course[]>(`${API_BASE_URL}/courses/instructor/my-courses`, {
      headers: getAuthHeaders(),
    });
  },

  async getInstructorDashboard(): Promise<InstructorDashboard> {
    return apiRequest<InstructorDashboard>(`${API_BASE_URL}/courses/instructor/dashboard`, {
      headers: getAuthHeaders(),
    });
  },
};

// Enrollments API
export const enrollmentsApi = {
  async enroll(courseId: number): Promise<Enrollment> {
    return apiRequest<Enrollment>(`${API_BASE_URL}/enrollments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ courseId }),
    });
  },

  async getMyEnrollments(): Promise<Enrollment[]> {
    return apiRequest<Enrollment[]>(`${API_BASE_URL}/enrollments/my-courses`, {
      headers: getAuthHeaders(),
    });
  },

  async getMyCourses(): Promise<Enrollment[]> {
    return apiRequest<Enrollment[]>(`${API_BASE_URL}/enrollments/my-courses`, {
      headers: getAuthHeaders(),
    });
  },

  async getDashboard(): Promise<DashboardStats & { recentCourses: Enrollment[] }> {
    return apiRequest<DashboardStats & { recentCourses: Enrollment[] }>(
      `${API_BASE_URL}/enrollments/dashboard`,
      { headers: getAuthHeaders() }
    );
  },

  async getStats(): Promise<DashboardStats> {
    try {
      return await apiRequest<DashboardStats>(`${API_BASE_URL}/enrollments/stats`, {
        headers: getAuthHeaders(),
      });
    } catch {
      // Calculate stats from enrollments if endpoint doesn't exist
      const enrollments = await this.getMyEnrollments();
      return {
        totalEnrollments: enrollments.length,
        inProgress: enrollments.filter(e => (e.progress || 0) > 0 && (e.progress || 0) < 100).length,
        completed: enrollments.filter(e => (e.progress || 0) === 100).length,
        totalHours: 0,
      };
    }
  },

  async updateProgress(enrollmentId: number, progress: number): Promise<Enrollment> {
    return apiRequest<Enrollment>(`${API_BASE_URL}/enrollments/${enrollmentId}/progress`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ progress }),
    });
  },

  async getProgress(courseId: number): Promise<LessonProgress[]> {
    try {
      return await apiRequest<LessonProgress[]>(
        `${API_BASE_URL}/enrollments/courses/${courseId}/lesson-progress`,
        { headers: getAuthHeaders() }
      );
    } catch {
      return []; // Return empty array if endpoint doesn't exist
    }
  },

  async markLessonComplete(courseId: number, lessonId: number): Promise<LessonProgress> {
    return apiRequest<LessonProgress>(`${API_BASE_URL}/enrollments/lessons/${lessonId}/progress`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ completed: true }),
    });
  },

  async updateLessonProgress(
    lessonId: number, 
    data: { completed?: boolean; watchedDuration?: number }
  ): Promise<LessonProgress> {
    return apiRequest<LessonProgress>(`${API_BASE_URL}/enrollments/lessons/${lessonId}/progress`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },

  async getLessonProgress(courseId: number): Promise<LessonProgress[]> {
    return apiRequest<LessonProgress[]>(
      `${API_BASE_URL}/enrollments/courses/${courseId}/lesson-progress`,
      { headers: getAuthHeaders() }
    );
  },
};

// Notifications API
export const notificationsApi = {
  async getAll(): Promise<Notification[]> {
    return apiRequest<Notification[]>(`${API_BASE_URL}/notifications`, {
      headers: getAuthHeaders(),
    });
  },

  async getUnreadCount(): Promise<{ count: number }> {
    return apiRequest<{ count: number }>(`${API_BASE_URL}/notifications/unread-count`, {
      headers: getAuthHeaders(),
    });
  },

  async markAsRead(id: number): Promise<void> {
    return apiRequest<void>(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
  },

  async markAllAsRead(): Promise<void> {
    return apiRequest<void>(`${API_BASE_URL}/notifications/read-all`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
  },

  async delete(id: number): Promise<void> {
    return apiRequest<void>(`${API_BASE_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};

// Users API (for profile)
export const usersApi = {
  async getProfile(): Promise<User> {
    return apiRequest<User>(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders(),
    });
  },
};

// Admin API
export const adminApi = {
  async getDashboard(): Promise<AdminDashboardStats> {
    return apiRequest<AdminDashboardStats>(`${API_BASE_URL}/admin/dashboard`, {
      headers: getAuthHeaders(),
    });
  },

  async getUsers(page: number = 1, limit: number = 10): Promise<PaginatedResult<User>> {
    return apiRequest<PaginatedResult<User>>(
      `${API_BASE_URL}/admin/users?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
  },

  async toggleUserStatus(userId: number): Promise<User> {
    return apiRequest<User>(`${API_BASE_URL}/admin/users/${userId}/toggle-status`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },

  async deleteUser(userId: number): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },

  async getCourses(page: number = 1, limit: number = 10): Promise<PaginatedResult<Course>> {
    return apiRequest<PaginatedResult<Course>>(
      `${API_BASE_URL}/admin/courses?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
  },

  async toggleCourseStatus(courseId: number): Promise<Course> {
    return apiRequest<Course>(`${API_BASE_URL}/admin/courses/${courseId}/toggle-status`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },

  async deleteCourse(courseId: number): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`${API_BASE_URL}/admin/courses/${courseId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },

  async updateCourse(courseId: number, data: Partial<Course>): Promise<Course> {
    return apiRequest<Course>(`${API_BASE_URL}/admin/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },

  async getPendingCourses(): Promise<Course[]> {
    return apiRequest<Course[]>(`${API_BASE_URL}/admin/courses/pending`, {
      headers: getAuthHeaders(),
    });
  },

  async approveCourse(courseId: number): Promise<Course> {
    return apiRequest<Course>(`${API_BASE_URL}/admin/courses/${courseId}/approve`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },

  async rejectCourse(courseId: number, reason?: string): Promise<Course> {
    return apiRequest<Course>(
      `${API_BASE_URL}/admin/courses/${courseId}/reject${reason ? `?reason=${encodeURIComponent(reason)}` : ''}`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
      }
    );
  },

  async getEnrollments(page: number = 1, limit: number = 10): Promise<PaginatedResult<Enrollment>> {
    return apiRequest<PaginatedResult<Enrollment>>(
      `${API_BASE_URL}/admin/enrollments?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
  },

  async getTopInstructors(limit: number = 5): Promise<User[]> {
    return apiRequest<User[]>(`${API_BASE_URL}/admin/top-instructors?limit=${limit}`, {
      headers: getAuthHeaders(),
    });
  },

  async getRevenueAnalytics(): Promise<{ month: string; revenue: number }[]> {
    return apiRequest<{ month: string; revenue: number }[]>(`${API_BASE_URL}/admin/revenue-analytics`, {
      headers: getAuthHeaders(),
    });
  },

  async getAnalytics(): Promise<{
    userDistribution: {
      students: { count: number; percentage: number };
      instructors: { count: number; percentage: number };
      admins: { count: number; percentage: number };
    };
    categoryDistribution: { category: string; count: number; percentage: number }[];
    weeklyEnrollments: { day: string; count: number }[];
    completionRate: number;
    averageRating: number;
    totalEnrollments: number;
    completedCourses: number;
  }> {
    return apiRequest(`${API_BASE_URL}/admin/analytics`, {
      headers: getAuthHeaders(),
    });
  },
};

// Chatbot API
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  metadata?: {
    courseId?: number;
    lessonId?: number;
    sources?: string[];
    tokens?: number;
    model?: string;
  };
  createdAt: string;
}

export interface ChatSession {
  id: string;
  title: string;
  isActive: boolean;
  courseId?: number;
  messageCount: number;
  totalTokens: number;
  messages?: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatResponse {
  message: ChatMessage;
  session: ChatSession;
  sources?: Array<{
    content: string;
    score: number;
    lessonId?: number;
  }>;
}

export const chatbotApi = {
  async getStatus(): Promise<{ configured: boolean; providers: string[] }> {
    return apiRequest(`${API_BASE_URL}/chatbot/status`, {
      headers: getChatbotHeaders(),
    });
  },

  async createSession(data: { title?: string; courseId?: number; systemPrompt?: string }): Promise<ChatSession> {
    return apiRequest<ChatSession>(`${API_BASE_URL}/chatbot/sessions`, {
      method: 'POST',
      headers: getChatbotHeaders(),
      body: JSON.stringify(data),
    });
  },

  async getSessions(courseId?: number): Promise<ChatSession[]> {
    const url = courseId
      ? `${API_BASE_URL}/chatbot/sessions?courseId=${courseId}`
      : `${API_BASE_URL}/chatbot/sessions`;
    return apiRequest<ChatSession[]>(url, {
      headers: getChatbotHeaders(),
    });
  },

  async getSession(sessionId: string): Promise<ChatSession> {
    return apiRequest<ChatSession>(`${API_BASE_URL}/chatbot/sessions/${sessionId}`, {
      headers: getChatbotHeaders(),
    });
  },

  async deleteSession(sessionId: string): Promise<void> {
    return apiRequest(`${API_BASE_URL}/chatbot/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: getChatbotHeaders(),
    });
  },

  async sendMessage(data: {
    message: string;
    sessionId?: string;
    courseId?: number;
    lessonId?: number;
    provider?: 'openai' | 'anthropic' | 'google';
  }): Promise<ChatResponse> {
    return apiRequest<ChatResponse>(`${API_BASE_URL}/chatbot/chat`, {
      method: 'POST',
      headers: getChatbotHeaders(),
      body: JSON.stringify(data),
    });
  },

  async getStats(): Promise<{ totalSessions: number; totalMessages: number; totalTokens: number }> {
    return apiRequest(`${API_BASE_URL}/chatbot/stats`, {
      headers: getChatbotHeaders(),
    });
  },

  async indexCourse(courseId: number, chunkSize?: number, chunkOverlap?: number): Promise<{ indexed: number; chunks: number }> {
    return apiRequest(`${API_BASE_URL}/chatbot/index`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ courseId, chunkSize, chunkOverlap }),
    });
  },
};

// Video Streaming API
export interface VideoAsset {
  id: string;
  originalFilename: string;
  fileSize: number;
  mimeType: string;
  duration?: number;
  width?: number;
  height?: number;
  status: 'pending' | 'processing' | 'ready' | 'failed';
  errorMessage?: string;
  hlsPlaylistPath?: string;
  thumbnailPath?: string;
  lessonId?: number;
  viewCount: number;
  createdAt: string;
}

export interface VideoProgress {
  id: string;
  videoId: string;
  currentTime: number;
  watchedDuration: number;
  progressPercent: number;
  completed: boolean;
  playbackSpeed: number;
  preferredQuality?: string;
}

export const videoApi = {
  async getStatus(): Promise<{
    enabled: boolean;
    ffmpegAvailable: boolean;
    cdnConfigured: boolean;
    totalVideos: number;
    readyVideos: number;
    processingVideos: number;
  }> {
    return apiRequest(`${API_BASE_URL}/videos/status`, {
      headers: getAuthHeaders(),
    });
  },

  async uploadVideo(file: File, lessonId?: number, title?: string): Promise<VideoAsset> {
    const formData = new FormData();
    formData.append('video', file);
    if (lessonId) formData.append('lessonId', lessonId.toString());
    if (title) formData.append('title', title);

    const token = localStorage.getItem('token');
    return apiRequest<VideoAsset>(`${API_BASE_URL}/videos/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  },

  async getVideo(videoId: string): Promise<VideoAsset> {
    return apiRequest<VideoAsset>(`${API_BASE_URL}/videos/${videoId}`, {
      headers: getAuthHeaders(),
    });
  },

  async getVideoByLesson(lessonId: number): Promise<VideoAsset | null> {
    return apiRequest<VideoAsset | null>(`${API_BASE_URL}/videos/lesson/${lessonId}`, {
      headers: getAuthHeaders(),
    });
  },

  getStreamUrl(videoId: string, quality?: string): string {
    const baseUrl = `${API_BASE_URL}/videos/${videoId}/stream`;
    return quality ? `${baseUrl}?quality=${quality}` : baseUrl;
  },

  getHLSUrl(videoId: string): string {
    return `${API_BASE_URL}/videos/${videoId}/hls/master.m3u8`;
  },

  getThumbnailUrl(videoId: string, index: number = 0): string {
    return `${API_BASE_URL}/videos/${videoId}/thumbnail/${index}`;
  },

  async updateProgress(videoId: string, data: {
    currentTime: number;
    watchedDuration?: number;
    completed?: boolean;
    playbackSpeed?: number;
    preferredQuality?: string;
  }): Promise<VideoProgress> {
    return apiRequest<VideoProgress>(`${API_BASE_URL}/videos/${videoId}/progress`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
  },

  async getProgress(videoId: string): Promise<VideoProgress | null> {
    return apiRequest<VideoProgress | null>(`${API_BASE_URL}/videos/${videoId}/progress`, {
      headers: getAuthHeaders(),
    });
  },

  async deleteVideo(videoId: string): Promise<void> {
    return apiRequest(`${API_BASE_URL}/videos/${videoId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};
