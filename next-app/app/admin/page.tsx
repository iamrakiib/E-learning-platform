'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { adminApi } from '../../lib/api';
import { AdminDashboardStats, User, Course, Enrollment, PaginatedResult } from '../../lib/api-types';
import { LoadingSpinner, ErrorMessage, Badge, Modal } from '../../components/ui';
import { DashboardSkeleton, SkeletonTable } from '../../components/PageLoader';

type AdminTab = 'overview' | 'users' | 'courses' | 'enrollments' | 'analytics';

interface AnalyticsData {
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
}

export default function AdminDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [users, setUsers] = useState<PaginatedResult<User> | null>(null);
  const [courses, setCourses] = useState<PaginatedResult<Course> | null>(null);
  const [enrollments, setEnrollments] = useState<PaginatedResult<Enrollment> | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [greeting, setGreeting] = useState('');
  
  // Pagination
  const [usersPage, setUsersPage] = useState(1);
  const [coursesPage, setCoursesPage] = useState(1);
  const [enrollmentsPage, setEnrollmentsPage] = useState(1);
  
  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'user' | 'course'; id: number; name: string } | null>(null);
  
  // Edit course modal state
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editCourseForm, setEditCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    price: 0,
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'admin') {
        router.push('/dashboard');
      } else {
        loadData();
      }
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      if (activeTab === 'users') loadUsers();
      else if (activeTab === 'courses') loadCourses();
      else if (activeTab === 'enrollments') loadEnrollments();
      else if (activeTab === 'analytics') loadAnalytics();
    }
  }, [activeTab, usersPage, coursesPage, enrollmentsPage]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const dashboardStats = await adminApi.getDashboard();
      setStats(dashboardStats);
    } catch (err: any) {
      setError(err.message || 'Failed to load admin dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await adminApi.getUsers(usersPage, 10);
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
    }
  };

  const loadCourses = async () => {
    try {
      const data = await adminApi.getCourses(coursesPage, 10);
      setCourses(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load courses');
    }
  };

  const loadEnrollments = async () => {
    try {
      const data = await adminApi.getEnrollments(enrollmentsPage, 10);
      setEnrollments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load enrollments');
    }
  };

  const loadAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      const data = await adminApi.getAnalytics();
      setAnalytics(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load analytics');
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId: number) => {
    try {
      setActionLoading(userId);
      await adminApi.toggleUserStatus(userId);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle user status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleCourseStatus = async (courseId: number) => {
    try {
      setActionLoading(courseId);
      await adminApi.toggleCourseStatus(courseId);
      await loadCourses();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle course status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    
    try {
      setActionLoading(deleteTarget.id);
      if (deleteTarget.type === 'user') {
        await adminApi.deleteUser(deleteTarget.id);
        await loadUsers();
      } else {
        await adminApi.deleteCourse(deleteTarget.id);
        await loadCourses();
      }
      setShowDeleteModal(false);
      setDeleteTarget(null);
    } catch (err: any) {
      setError(err.message || `Failed to delete ${deleteTarget.type}`);
    } finally {
      setActionLoading(null);
    }
  };

  const openDeleteModal = (type: 'user' | 'course', id: number, name: string) => {
    setDeleteTarget({ type, id, name });
    setShowDeleteModal(true);
  };

  const openEditCourseModal = (course: Course) => {
    setEditingCourse(course);
    setEditCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      price: Number(course.price),
    });
    setShowEditCourseModal(true);
  };

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    try {
      setActionLoading(editingCourse.id);
      await adminApi.updateCourse(editingCourse.id, editCourseForm);
      setShowEditCourseModal(false);
      setEditingCourse(null);
      await loadCourses();
    } catch (err: any) {
      setError(err.message || 'Failed to update course');
    } finally {
      setActionLoading(null);
    }
  };

  const getUserDisplayName = (u: User) => {
    if (u.name) return u.name;
    if (u.firstName || u.lastName) {
      return `${u.firstName || ''} ${u.lastName || ''}`.trim();
    }
    return u.email?.split('@')[0] || 'Unknown';
  };

  if (authLoading || !user) {
    return (
      <main className="role-dashboard admin-dashboard">
        <DashboardSkeleton />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="role-dashboard admin-dashboard">
        <DashboardSkeleton />
      </main>
    );
  }

  if (user.role !== 'admin') {
    return null;
  }

  return (
    <main className="role-dashboard admin-dashboard">
      {/* Animated Background */}
      <div className="dashboard-bg-animation admin-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Welcome Hero Section */}
      <section className="dashboard-hero animate-fade-in">
        <div className="hero-content">
          <div className="hero-text">
            <span className="greeting-badge admin-badge">
              <span className="wave-emoji">🛡️</span> {greeting}, Administrator
            </span>
            <h1 className="hero-title">
              <span className="gradient-text-admin">{user.name || user.email?.split('@')[0]}</span>
            </h1>
            <p className="hero-subtitle">
              Full system control and analytics at your fingertips
            </p>
          </div>
          <div className="hero-avatar">
            <div className="avatar-ring admin-ring">
              <div className="avatar-inner admin-avatar">
                {(user.name || user.email || 'A').charAt(0).toUpperCase()}
              </div>
            </div>
            <Badge variant="danger" className="role-badge-animated">⚡ Admin</Badge>
          </div>
        </div>
      </section>

      {error && <ErrorMessage message={error} onRetry={loadData} />}

      {/* Tab Navigation */}
      <nav className="admin-nav animate-slide-up">
        <div className="admin-tabs-fancy">
          {(['overview', 'users', 'courses', 'enrollments', 'analytics'] as AdminTab[]).map((tab) => (
            <button
              key={tab}
              className={`admin-tab-fancy ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="tab-icon">
                {tab === 'overview' && '📊'}
                {tab === 'users' && '👥'}
                {tab === 'courses' && '📚'}
                {tab === 'enrollments' && '📝'}
                {tab === 'analytics' && '📈'}
              </span>
              <span className="tab-text">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              {activeTab === tab && <span className="tab-indicator"></span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="admin-content animate-fade-in">
          {isLoading ? (
            <div className="loading-state">
              <LoadingSpinner size="lg" />
            </div>
          ) : stats ? (
            <>
              {/* Main Stats */}
              <section className="stats-section">
                <div className="stats-grid-animated admin-stats">
                  <div className="stat-card-animated stat-users" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                    <div className="stat-card-inner">
                      <div className="stat-icon-wrapper gradient-blue">
                        <span className="stat-icon">👥</span>
                      </div>
                      <div className="stat-content">
                        <span className="stat-number counter">{stats.overview.totalUsers}</span>
                        <span className="stat-label">Total Users</span>
                      </div>
                      <div className="stat-badge">
                        <span className="badge-dot green"></span>
                        {stats.overview.activeUsers} active
                      </div>
                    </div>
                  </div>

                  <div className="stat-card-animated stat-courses-admin" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                    <div className="stat-card-inner">
                      <div className="stat-icon-wrapper gradient-purple">
                        <span className="stat-icon">📚</span>
                      </div>
                      <div className="stat-content">
                        <span className="stat-number counter">{stats.overview.totalCourses}</span>
                        <span className="stat-label">Total Courses</span>
                      </div>
                      <div className="stat-badge">
                        <span className="badge-dot blue"></span>
                        {stats.overview.activeCourses} active
                      </div>
                    </div>
                  </div>

                  <div className="stat-card-animated stat-enrollments" style={{ '--delay': '0.3s' } as React.CSSProperties}>
                    <div className="stat-card-inner">
                      <div className="stat-icon-wrapper gradient-green">
                        <span className="stat-icon">📝</span>
                      </div>
                      <div className="stat-content">
                        <span className="stat-number counter">{stats.overview.totalEnrollments}</span>
                        <span className="stat-label">Enrollments</span>
                      </div>
                      <div className="stat-trend up">
                        <span>↑ Growing</span>
                      </div>
                    </div>
                  </div>

                  <div className="stat-card-animated stat-revenue-admin highlight" style={{ '--delay': '0.4s' } as React.CSSProperties}>
                    <div className="stat-card-inner">
                      <div className="stat-icon-wrapper gradient-gold">
                        <span className="stat-icon">💰</span>
                      </div>
                      <div className="stat-content">
                        <span className="stat-number counter">${stats.overview.totalRevenue}</span>
                        <span className="stat-label">Total Revenue</span>
                      </div>
                      <div className="stat-trend up">
                        <span>↑ This month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* System Status */}
              <section className="system-status-section animate-slide-up" style={{ '--delay': '0.3s' } as React.CSSProperties}>
                <div className="section-header-fancy">
                  <h2>
                    <span className="section-icon">🖥️</span>
                    System Status
                  </h2>
                </div>
                <div className="status-grid">
                  <div className="status-card healthy">
                    <div className="status-indicator">
                      <span className="pulse-dot"></span>
                    </div>
                    <div className="status-info">
                      <h4>API Server</h4>
                      <p>Running smoothly</p>
                    </div>
                    <span className="status-badge">Healthy</span>
                  </div>
                  <div className="status-card healthy">
                    <div className="status-indicator">
                      <span className="pulse-dot"></span>
                    </div>
                    <div className="status-info">
                      <h4>Database</h4>
                      <p>Connected</p>
                    </div>
                    <span className="status-badge">Healthy</span>
                  </div>
                  <div className="status-card healthy">
                    <div className="status-indicator">
                      <span className="pulse-dot"></span>
                    </div>
                    <div className="status-info">
                      <h4>Authentication</h4>
                      <p>Operational</p>
                    </div>
                    <span className="status-badge">Healthy</span>
                  </div>
                </div>
              </section>

              {/* Quick Actions */}
              <section className="admin-quick-actions animate-slide-up" style={{ '--delay': '0.4s' } as React.CSSProperties}>
                <div className="section-header-fancy">
                  <h2>
                    <span className="section-icon">⚡</span>
                    Quick Actions
                  </h2>
                </div>
                <div className="quick-actions-grid-admin">
                  <button className="admin-action-card" onClick={() => setActiveTab('users')}>
                    <div className="action-icon-wrapper blue">
                      <span>👥</span>
                    </div>
                    <span className="action-title">Manage Users</span>
                    <span className="action-count">{stats.overview.totalUsers} total</span>
                  </button>
                  <button className="admin-action-card" onClick={() => setActiveTab('courses')}>
                    <div className="action-icon-wrapper purple">
                      <span>📚</span>
                    </div>
                    <span className="action-title">Manage Courses</span>
                    <span className="action-count">{stats.overview.totalCourses} total</span>
                  </button>
                  <button className="admin-action-card" onClick={() => setActiveTab('enrollments')}>
                    <div className="action-icon-wrapper green">
                      <span>📝</span>
                    </div>
                    <span className="action-title">View Enrollments</span>
                    <span className="action-count">{stats.overview.totalEnrollments} total</span>
                  </button>
                  <button className="admin-action-card" onClick={() => setActiveTab('analytics')}>
                    <div className="action-icon-wrapper orange">
                      <span>📈</span>
                    </div>
                    <span className="action-title">Analytics</span>
                    <span className="action-count">View reports</span>
                  </button>
                </div>
              </section>
            </>
          ) : null}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="admin-content animate-fade-in">
          <div className="admin-table-section">
            <div className="table-header-fancy">
              <h3>
                <span className="header-icon">👥</span>
                User Management
              </h3>
              <div className="table-info">
                {users?.meta.total || 0} users total
              </div>
            </div>
            
            {users ? (
              <>
                <div className="admin-table-wrapper">
                  <table className="admin-table-fancy">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.data.map((u, index) => (
                        <tr key={u.id} style={{ '--delay': `${0.05 * index}s` } as React.CSSProperties}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-small">
                                {getUserDisplayName(u).charAt(0).toUpperCase()}
                              </div>
                              <span className="user-name">{getUserDisplayName(u)}</span>
                            </div>
                          </td>
                          <td className="email-cell">{u.email}</td>
                          <td>
                            <Badge variant={u.role === 'admin' ? 'danger' : u.role === 'instructor' ? 'primary' : 'secondary'}>
                              {u.role}
                            </Badge>
                          </td>
                          <td>
                            <span className={`status-pill ${u.isActive ? 'active' : 'inactive'}`}>
                              <span className="status-dot"></span>
                              {u.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="date-cell">{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div className="action-buttons-fancy">
                              <button
                                className={`action-btn-fancy ${u.isActive ? 'warning' : 'success'}`}
                                onClick={() => handleToggleUserStatus(u.id)}
                                disabled={actionLoading === u.id}
                              >
                                {actionLoading === u.id ? '...' : u.isActive ? 'Suspend' : 'Activate'}
                              </button>
                              <button
                                className="action-btn-fancy danger"
                                onClick={() => openDeleteModal('user', u.id, getUserDisplayName(u))}
                                disabled={actionLoading === u.id}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="pagination-fancy">
                  <button 
                    className="page-btn"
                    disabled={usersPage === 1}
                    onClick={() => setUsersPage(p => p - 1)}
                  >
                    ← Previous
                  </button>
                  <span className="page-info">Page {usersPage} of {users.meta.pageCount || 1}</span>
                  <button 
                    className="page-btn"
                    disabled={usersPage >= (users.meta.pageCount || 1)}
                    onClick={() => setUsersPage(p => p + 1)}
                  >
                    Next →
                  </button>
                </div>
              </>
            ) : (
              <div className="loading-state">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="admin-content animate-fade-in">
          <div className="admin-table-section">
            <div className="table-header-fancy">
              <h3>
                <span className="header-icon">📚</span>
                Course Management
              </h3>
              <div className="table-info">
                {courses?.meta.total || 0} courses total
              </div>
            </div>
            
            {courses ? (
              <>
                <div className="admin-table-wrapper">
                  <table className="admin-table-fancy">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Instructor</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.data.map((course, index) => (
                        <tr key={course.id} style={{ '--delay': `${0.05 * index}s` } as React.CSSProperties}>
                          <td>
                            <div className="course-cell">
                              <span className="course-emoji">
                                {course.category === 'programming' ? '💻' : '📖'}
                              </span>
                              <span className="course-name">{course.title}</span>
                            </div>
                          </td>
                          <td>
                            {course.instructorUser 
                              ? getUserDisplayName(course.instructorUser)
                              : typeof course.instructor === 'object' 
                                ? course.instructor?.name 
                                : 'N/A'}
                          </td>
                          <td><Badge variant="secondary">{course.category}</Badge></td>
                          <td className="price-cell">${Number(course.price).toFixed(2)}</td>
                          <td>
                            <span className={`status-pill ${course.isActive ? 'active' : 'inactive'}`}>
                              <span className="status-dot"></span>
                              {course.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons-fancy">
                              <button
                                className="action-btn-fancy primary"
                                onClick={() => openEditCourseModal(course)}
                                disabled={actionLoading === course.id}
                              >
                                Edit
                              </button>
                              <button
                                className={`action-btn-fancy ${course.isActive ? 'warning' : 'success'}`}
                                onClick={() => handleToggleCourseStatus(course.id)}
                                disabled={actionLoading === course.id}
                              >
                                {actionLoading === course.id ? '...' : course.isActive ? 'Disable' : 'Enable'}
                              </button>
                              <button
                                className="action-btn-fancy danger"
                                onClick={() => openDeleteModal('course', course.id, course.title)}
                                disabled={actionLoading === course.id}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="pagination-fancy">
                  <button 
                    className="page-btn"
                    disabled={coursesPage === 1}
                    onClick={() => setCoursesPage(p => p - 1)}
                  >
                    ← Previous
                  </button>
                  <span className="page-info">Page {coursesPage} of {courses.meta.pageCount || 1}</span>
                  <button 
                    className="page-btn"
                    disabled={coursesPage >= (courses.meta.pageCount || 1)}
                    onClick={() => setCoursesPage(p => p + 1)}
                  >
                    Next →
                  </button>
                </div>
              </>
            ) : (
              <div className="loading-state">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enrollments Tab */}
      {activeTab === 'enrollments' && (
        <div className="admin-content animate-fade-in">
          <div className="admin-table-section">
            <div className="table-header-fancy">
              <h3>
                <span className="header-icon">📝</span>
                Enrollment Records
              </h3>
              <div className="table-info">
                {enrollments?.meta.total || 0} enrollments total
              </div>
            </div>
            
            {enrollments ? (
              <>
                <div className="admin-table-wrapper">
                  <table className="admin-table-fancy">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Course</th>
                        <th>Progress</th>
                        <th>Enrolled</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.data.map((enrollment, index) => (
                        <tr key={enrollment.id} style={{ '--delay': `${0.05 * index}s` } as React.CSSProperties}>
                          <td>#{enrollment.id}</td>
                          <td>User #{enrollment.userId}</td>
                          <td className="course-name-cell">{enrollment.course?.title || `Course #${enrollment.courseId}`}</td>
                          <td>
                            <div className="progress-cell-fancy">
                              <div className="progress-bar-mini">
                                <div 
                                  className="progress-fill-mini" 
                                  style={{ width: `${enrollment.progress || 0}%` }}
                                />
                              </div>
                              <span className="progress-text">{enrollment.progress || 0}%</span>
                            </div>
                          </td>
                          <td className="date-cell">{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
                          <td>
                            <Badge variant={
                              enrollment.progress === 100 ? 'success' : 
                              (enrollment.progress || 0) > 0 ? 'warning' : 'secondary'
                            }>
                              {enrollment.progress === 100 ? 'Completed' : 
                               (enrollment.progress || 0) > 0 ? 'In Progress' : 'Not Started'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="pagination-fancy">
                  <button 
                    className="page-btn"
                    disabled={enrollmentsPage === 1}
                    onClick={() => setEnrollmentsPage(p => p - 1)}
                  >
                    ← Previous
                  </button>
                  <span className="page-info">Page {enrollmentsPage} of {enrollments.meta.pageCount || 1}</span>
                  <button 
                    className="page-btn"
                    disabled={enrollmentsPage >= (enrollments.meta.pageCount || 1)}
                    onClick={() => setEnrollmentsPage(p => p + 1)}
                  >
                    Next →
                  </button>
                </div>
              </>
            ) : (
              <div className="loading-state">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="admin-content animate-fade-in">
          <div className="analytics-section">
            <div className="section-header-fancy">
              <h2>
                <span className="section-icon">📈</span>
                Platform Analytics
              </h2>
            </div>
            
            {analyticsLoading ? (
              <div className="loading-state">
                <LoadingSpinner />
                <p>Loading analytics data...</p>
              </div>
            ) : analytics ? (
              <>
                {/* Summary Stats */}
                <div className="analytics-summary">
                  <div className="analytics-stat-card">
                    <span className="stat-icon">✅</span>
                    <div className="stat-info">
                      <span className="stat-value">{analytics.completionRate}%</span>
                      <span className="stat-label">Completion Rate</span>
                    </div>
                  </div>
                  <div className="analytics-stat-card">
                    <span className="stat-icon">⭐</span>
                    <div className="stat-info">
                      <span className="stat-value">{analytics.averageRating}</span>
                      <span className="stat-label">Avg. Rating</span>
                    </div>
                  </div>
                  <div className="analytics-stat-card">
                    <span className="stat-icon">📚</span>
                    <div className="stat-info">
                      <span className="stat-value">{analytics.totalEnrollments}</span>
                      <span className="stat-label">Total Enrollments</span>
                    </div>
                  </div>
                  <div className="analytics-stat-card">
                    <span className="stat-icon">🎓</span>
                    <div className="stat-info">
                      <span className="stat-value">{analytics.completedCourses}</span>
                      <span className="stat-label">Completed Courses</span>
                    </div>
                  </div>
                </div>

                <div className="analytics-grid">
                  <div className="analytics-card large">
                    <h4>Weekly Enrollments</h4>
                    <div className="chart-placeholder">
                      <div className="bar-chart-visual">
                        {analytics.weeklyEnrollments.map((item, i) => {
                          const maxCount = Math.max(...analytics.weeklyEnrollments.map(e => e.count), 1);
                          const heightPercent = (item.count / maxCount) * 100;
                          return (
                            <div 
                              key={i} 
                              className="chart-bar" 
                              style={{ height: `${Math.max(heightPercent, 5)}%`, animationDelay: `${i * 0.1}s` }}
                            >
                              <span className="bar-value">{item.count}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="chart-labels">
                        {analytics.weeklyEnrollments.map((item, i) => (
                          <span key={i}>{item.day}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="analytics-card">
                    <h4>User Distribution</h4>
                    <div className="distribution-chart">
                      <div className="distribution-item">
                        <div className="dist-bar" style={{ width: `${analytics.userDistribution.students.percentage}%`, backgroundColor: '#3b82f6' }}></div>
                        <span className="dist-label">Students ({analytics.userDistribution.students.count} - {analytics.userDistribution.students.percentage}%)</span>
                      </div>
                      <div className="distribution-item">
                        <div className="dist-bar" style={{ width: `${analytics.userDistribution.instructors.percentage}%`, backgroundColor: '#8b5cf6' }}></div>
                        <span className="dist-label">Instructors ({analytics.userDistribution.instructors.count} - {analytics.userDistribution.instructors.percentage}%)</span>
                      </div>
                      <div className="distribution-item">
                        <div className="dist-bar" style={{ width: `${Math.max(analytics.userDistribution.admins.percentage, 3)}%`, backgroundColor: '#ef4444' }}></div>
                        <span className="dist-label">Admins ({analytics.userDistribution.admins.count} - {analytics.userDistribution.admins.percentage}%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="analytics-card">
                    <h4>Course Categories</h4>
                    <div className="category-chart">
                      {analytics.categoryDistribution.length > 0 ? (
                        analytics.categoryDistribution.slice(0, 6).map((cat, i) => {
                          const icons: Record<string, string> = {
                            programming: '💻',
                            design: '🎨',
                            business: '💼',
                            marketing: '📢',
                            development: '⚙️',
                            data: '📊',
                            web: '🌐',
                            mobile: '📱',
                            other: '📁',
                          };
                          const icon = icons[cat.category.toLowerCase()] || '📂';
                          return (
                            <div key={i} className="category-item">
                              <span className="category-icon">{icon}</span>
                              <span className="category-name">{cat.category}</span>
                              <span className="category-count">{cat.percentage}% ({cat.count})</span>
                            </div>
                          );
                        })
                      ) : (
                        <div className="no-data">No courses yet</div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>No analytics data available</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        title={`Delete ${deleteTarget?.type === 'user' ? 'User' : 'Course'}`}
      >
        <div className="delete-modal-content-fancy">
          <div className="delete-icon">⚠️</div>
          <p>Are you sure you want to delete this {deleteTarget?.type}?</p>
          <p className="delete-target-name"><strong>{deleteTarget?.name}</strong></p>
          <p className="delete-warning">This action cannot be undone.</p>
          <div className="modal-actions-fancy">
            <button 
              className="btn-cancel-fancy" 
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteTarget(null);
              }}
            >
              Cancel
            </button>
            <button 
              className="btn-delete-fancy" 
              onClick={handleDeleteConfirm}
              disabled={actionLoading !== null}
            >
              {actionLoading !== null ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Course Modal */}
      <Modal
        isOpen={showEditCourseModal}
        onClose={() => {
          setShowEditCourseModal(false);
          setEditingCourse(null);
        }}
        title="Edit Course"
      >
        <form onSubmit={handleUpdateCourse} className="edit-course-form">
          <div className="form-group">
            <label htmlFor="edit-title">Course Title</label>
            <input
              id="edit-title"
              type="text"
              value={editCourseForm.title}
              onChange={(e) => setEditCourseForm(prev => ({ ...prev, title: e.target.value }))}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={editCourseForm.description}
              onChange={(e) => setEditCourseForm(prev => ({ ...prev, description: e.target.value }))}
              required
              className="form-textarea"
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-category">Category</label>
              <select
                id="edit-category"
                value={editCourseForm.category}
                onChange={(e) => setEditCourseForm(prev => ({ ...prev, category: e.target.value }))}
                className="form-select"
              >
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="data_science">Data Science</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="edit-level">Level</label>
              <select
                id="edit-level"
                value={editCourseForm.level}
                onChange={(e) => setEditCourseForm(prev => ({ ...prev, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' }))}
                className="form-select"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-price">Price ($)</label>
            <input
              id="edit-price"
              type="number"
              min="0"
              step="0.01"
              value={editCourseForm.price}
              onChange={(e) => setEditCourseForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              className="form-input"
            />
          </div>

          <div className="modal-actions-fancy">
            <button
              type="button"
              className="btn-cancel-fancy"
              onClick={() => {
                setShowEditCourseModal(false);
                setEditingCourse(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-save-fancy"
              disabled={actionLoading !== null}
            >
              {actionLoading !== null ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}
