'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { coursesApi } from '../../lib/api';
import { Course, InstructorDashboard } from '../../lib/api-types';
import { LoadingSpinner, ErrorMessage, EmptyState, StarRating, Badge, Modal } from '../../components/ui';
import { DashboardSkeleton } from '../../components/PageLoader';

export default function InstructorDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [dashboardData, setDashboardData] = useState<InstructorDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeView, setActiveView] = useState<'grid' | 'table'>('grid');
  const [greeting, setGreeting] = useState('');

  // Create course form state
  const [newCourse, setNewCourse] = useState<{
    title: string;
    description: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    price: number;
  }>({
    title: '',
    description: '',
    category: 'programming',
    level: 'beginner',
    price: 0,
  });
  const [creating, setCreating] = useState(false);

  // Edit course modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editCourseForm, setEditCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    price: 0,
  });
  const [updating, setUpdating] = useState(false);

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
        return;
      }
      if (user.role !== 'instructor' && user.role !== 'admin') {
        router.push('/dashboard');
        return;
      }
      loadDashboard();
    }
  }, [user, authLoading, router]);

  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const [dashboard, coursesData] = await Promise.all([
        coursesApi.getInstructorDashboard().catch(() => null),
        coursesApi.getMyCourses().catch(() => []),
      ]);

      if (dashboard) {
        setDashboardData(dashboard);
      }
      setCourses(coursesData);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreating(true);
      await coursesApi.create(newCourse);
      setShowCreateModal(false);
      setNewCourse({
        title: '',
        description: '',
        category: 'programming',
        level: 'beginner',
        price: 0,
      });
      loadDashboard();
    } catch (err: any) {
      setError(err.message || 'Failed to create course');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await coursesApi.delete(courseId);
      loadDashboard();
    } catch (err: any) {
      setError(err.message || 'Failed to delete course');
    }
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setEditCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      price: Number(course.price),
    });
    setShowEditModal(true);
  };

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    try {
      setUpdating(true);
      await coursesApi.update(editingCourse.id, editCourseForm);
      setShowEditModal(false);
      setEditingCourse(null);
      loadDashboard();
    } catch (err: any) {
      setError(err.message || 'Failed to update course');
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <main className="role-dashboard instructor-dashboard">
        <DashboardSkeleton />
      </main>
    );
  }

  if (!user || (user.role !== 'instructor' && user.role !== 'admin')) {
    return null;
  }

  return (
    <main className="role-dashboard instructor-dashboard">
      {/* Animated Background */}
      <div className="dashboard-bg-animation instructor-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      {/* Welcome Hero Section */}
      <section className="dashboard-hero animate-fade-in">
        <div className="hero-content">
          <div className="hero-text">
            <span className="greeting-badge instructor-badge">
              <span className="wave-emoji">📚</span> {greeting}, Instructor
            </span>
            <h1 className="hero-title">
              <span className="gradient-text-instructor">{user.name || user.email?.split('@')[0]}</span>
            </h1>
            <p className="hero-subtitle">
              Manage your courses and track student engagement
            </p>
          </div>
          <div className="hero-avatar">
            <div className="avatar-ring instructor-ring">
              <div className="avatar-inner">
                {(user.name || user.email || 'I').charAt(0).toUpperCase()}
              </div>
            </div>
            <Badge variant="primary" className="role-badge-animated">📖 Instructor</Badge>
          </div>
        </div>
        <div className="hero-actions">
          <button 
            className="btn-create-course"
            onClick={() => setShowCreateModal(true)}
          >
            <span className="btn-icon">+</span>
            Create New Course
          </button>
        </div>
      </section>

      {error && <ErrorMessage message={error} onRetry={loadDashboard} />}

      {/* Stats Cards */}
      <section className="stats-section animate-slide-up">
        <div className="stats-grid-animated instructor-stats">
          <div className="stat-card-animated stat-courses" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            <div className="stat-card-inner">
              <div className="stat-icon-wrapper blue">
                <span className="stat-icon">📚</span>
              </div>
              <div className="stat-content">
                <span className="stat-number">{dashboardData?.totalCourses || courses.length}</span>
                <span className="stat-label">Total Courses</span>
              </div>
              <div className="stat-chart">
                <div className="mini-bar-chart">
                  {[40, 65, 45, 80, 55].map((h, i) => (
                    <div key={i} className="bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card-animated stat-students" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            <div className="stat-card-inner">
              <div className="stat-icon-wrapper green">
                <span className="stat-icon">👥</span>
              </div>
              <div className="stat-content">
                <span className="stat-number">{dashboardData?.totalStudents || 0}</span>
                <span className="stat-label">Total Students</span>
              </div>
              <div className="stat-trend up">
                <span>↑ Growing</span>
              </div>
            </div>
          </div>

          <div className="stat-card-animated stat-revenue" style={{ '--delay': '0.3s' } as React.CSSProperties}>
            <div className="stat-card-inner">
              <div className="stat-icon-wrapper purple">
                <span className="stat-icon">💰</span>
              </div>
              <div className="stat-content">
                <span className="stat-number">${Number(dashboardData?.totalRevenue || 0).toFixed(0)}</span>
                <span className="stat-label">Total Revenue</span>
              </div>
              <div className="stat-trend up">
                <span>↑ This month</span>
              </div>
            </div>
          </div>

          <div className="stat-card-animated stat-rating" style={{ '--delay': '0.4s' } as React.CSSProperties}>
            <div className="stat-card-inner">
              <div className="stat-icon-wrapper orange">
                <span className="stat-icon">⭐</span>
              </div>
              <div className="stat-content">
                <span className="stat-number">{Number(dashboardData?.averageRating || 0).toFixed(1)}</span>
                <span className="stat-label">Avg Rating</span>
              </div>
              <div className="rating-stars">
                <StarRating rating={Number(dashboardData?.averageRating || 0)} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Chart Section */}
      <section className="performance-section animate-slide-up" style={{ '--delay': '0.3s' } as React.CSSProperties}>
        <div className="section-header-fancy">
          <h2>
            <span className="section-icon">📈</span>
            Performance Overview
          </h2>
        </div>
        <div className="performance-grid">
          <div className="performance-card">
            <h4>Student Engagement</h4>
            <div className="engagement-chart">
              <div className="engagement-bar">
                <div className="engagement-fill" style={{ width: '75%' }}>
                  <span>75%</span>
                </div>
              </div>
              <p>Active students this week</p>
            </div>
          </div>
          <div className="performance-card">
            <h4>Course Completion Rate</h4>
            <div className="completion-ring-small">
              <svg viewBox="0 0 80 80">
                <circle className="ring-bg" cx="40" cy="40" r="35" />
                <circle className="ring-fill" cx="40" cy="40" r="35" 
                  style={{ strokeDasharray: `${2 * Math.PI * 35}`, strokeDashoffset: `${2 * Math.PI * 35 * 0.35}` }} />
              </svg>
              <span className="ring-text">65%</span>
            </div>
          </div>
          <div className="performance-card">
            <h4>Recent Activity</h4>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-dot green"></span>
                <span>New enrollment today</span>
              </div>
              <div className="activity-item">
                <span className="activity-dot blue"></span>
                <span>5 lessons completed</span>
              </div>
              <div className="activity-item">
                <span className="activity-dot orange"></span>
                <span>2 new reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses-section animate-slide-up" style={{ '--delay': '0.4s' } as React.CSSProperties}>
        <div className="section-header-fancy">
          <div className="section-title-group">
            <h2>
              <span className="section-icon">📖</span>
              My Courses
            </h2>
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${activeView === 'grid' ? 'active' : ''}`}
                onClick={() => setActiveView('grid')}
              >
                <span>▦</span> Grid
              </button>
              <button 
                className={`toggle-btn ${activeView === 'table' ? 'active' : ''}`}
                onClick={() => setActiveView('table')}
              >
                <span>☰</span> Table
              </button>
            </div>
          </div>
          <button 
            className="btn-create-course-small"
            onClick={() => setShowCreateModal(true)}
          >
            + Add Course
          </button>
        </div>

        {courses.length === 0 ? (
          <EmptyState
            title="No courses yet"
            description="Create your first course and start teaching"
            icon="📚"
            action={
              <button onClick={() => setShowCreateModal(true)} className="button button-primary">
                Create Course
              </button>
            }
          />
        ) : activeView === 'grid' ? (
          <div className="instructor-courses-grid">
            {courses.map((course, index) => (
              <div 
                key={course.id} 
                className="instructor-course-card"
                style={{ '--delay': `${0.1 * index}s` } as React.CSSProperties}
              >
                <div className="course-card-top">
                  <div className="course-status-indicator">
                    <span className={`status-dot ${course.isActive ? 'active' : 'inactive'}`}></span>
                    {course.isActive ? 'Published' : 'Draft'}
                  </div>
                  <div className="course-thumbnail-instructor">
                    <span>
                      {course.category === 'programming' ? '💻' :
                       course.category === 'design' ? '🎨' :
                       course.category === 'business' ? '💼' : '📖'}
                    </span>
                  </div>
                </div>
                
                <div className="course-card-content">
                  <Badge variant="secondary">{course.level}</Badge>
                  <h3>{course.title}</h3>
                  <p>{course.description?.slice(0, 60)}...</p>
                  
                  <div className="course-stats-row">
                    <div className="course-stat">
                      <span className="stat-icon-small">👥</span>
                      <span>{course.enrollmentCount || 0}</span>
                    </div>
                    <div className="course-stat">
                      <span className="stat-icon-small">⭐</span>
                      <span>{Number(course.averageRating || 0).toFixed(1)}</span>
                    </div>
                    <div className="course-stat">
                      <span className="stat-icon-small">💰</span>
                      <span>${Number(course.price).toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <div className="course-card-actions-instructor">
                  <Link href={`/courses/${course.id}`} className="action-btn view">
                    View
                  </Link>
                  <button 
                    className="action-btn edit"
                    onClick={() => openEditModal(course)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="instructor-courses-table">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Category</th>
                  <th>Students</th>
                  <th>Rating</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>
                      <div className="course-info-cell">
                        <span className="course-emoji-small">
                          {course.category === 'programming' ? '💻' : '📖'}
                        </span>
                        <span className="course-title-cell">{course.title}</span>
                      </div>
                    </td>
                    <td><Badge variant="secondary">{course.category}</Badge></td>
                    <td>{course.enrollmentCount || 0}</td>
                    <td>
                      <span className="rating-cell">
                        ⭐ {Number(course.averageRating || 0).toFixed(1)}
                      </span>
                    </td>
                    <td>${Number(course.price).toFixed(0)}</td>
                    <td>
                      <Badge variant={course.isActive ? 'success' : 'warning'}>
                        {course.isActive ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link href={`/courses/${course.id}`} className="table-action-btn">
                          View
                        </Link>
                        <button 
                          className="table-action-btn edit"
                          onClick={() => openEditModal(course)}
                        >
                          Edit
                        </button>
                        <button 
                          className="table-action-btn delete"
                          onClick={() => handleDeleteCourse(course.id)}
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
        )}
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section animate-slide-up" style={{ '--delay': '0.5s' } as React.CSSProperties}>
        <div className="section-header-fancy">
          <h2>
            <span className="section-icon">⚡</span>
            Quick Actions
          </h2>
        </div>
        <div className="quick-actions-animated">
          <button onClick={() => setShowCreateModal(true)} className="quick-action-card-fancy instructor">
            <span className="action-icon-fancy">➕</span>
            <span className="action-text">New Course</span>
            <span className="action-arrow">→</span>
          </button>
          <Link href="/profile" className="quick-action-card-fancy instructor">
            <span className="action-icon-fancy">👤</span>
            <span className="action-text">My Profile</span>
            <span className="action-arrow">→</span>
          </Link>
          <button className="quick-action-card-fancy instructor" onClick={loadDashboard}>
            <span className="action-icon-fancy">🔄</span>
            <span className="action-text">Refresh</span>
            <span className="action-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Create Course Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Course"
      >
        <form onSubmit={handleCreateCourse} className="create-course-form">
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              placeholder="Enter course title"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              placeholder="Describe your course"
              rows={4}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={newCourse.category}
                onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
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
              <label>Level</label>
              <select
                value={newCourse.level}
                onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              value={newCourse.price}
              onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => setShowCreateModal(false)} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-create" disabled={creating}>
              {creating ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Course Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingCourse(null);
        }}
        title="Edit Course"
      >
        <form onSubmit={handleUpdateCourse} className="create-course-form">
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              value={editCourseForm.title}
              onChange={(e) => setEditCourseForm(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={editCourseForm.description}
              onChange={(e) => setEditCourseForm(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={editCourseForm.category}
                onChange={(e) => setEditCourseForm(prev => ({ ...prev, category: e.target.value }))}
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
              <label>Level</label>
              <select
                value={editCourseForm.level}
                onChange={(e) => setEditCourseForm(prev => ({ ...prev, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' }))}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              value={editCourseForm.price}
              onChange={(e) => setEditCourseForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => {
                setShowEditModal(false);
                setEditingCourse(null);
              }}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button type="submit" className="btn-create" disabled={updating}>
              {updating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}
