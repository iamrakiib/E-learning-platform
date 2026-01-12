'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { enrollmentsApi, coursesApi } from '../../lib/api';
import { Enrollment, DashboardStats, Course } from '../../lib/api-types';
import { LoadingSpinner, ErrorMessage, ProgressBar, Badge, EmptyState } from '../../components/ui';
import { DashboardSkeleton } from '../../components/PageLoader';

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'inProgress' | 'completed'>('all');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      loadDashboard();
    }
  }, [user, authLoading, router]);

  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      const [coursesData, statsData, allCourses] = await Promise.all([
        enrollmentsApi.getMyCourses(),
        enrollmentsApi.getStats(),
        coursesApi.getAll(),
      ]);
      setEnrollments(coursesData);
      setStats(statsData);
      
      const enrolledIds = new Set(coursesData.map((e: Enrollment) => e.courseId));
      const recommendations = (allCourses as Course[]).filter(
        (c: Course) => !enrolledIds.has(c.id)
      ).slice(0, 4);
      setRecommendedCourses(recommendations);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter(e => {
    if (activeTab === 'inProgress') return (e.progress || 0) > 0 && (e.progress || 0) < 100;
    if (activeTab === 'completed') return e.progress === 100;
    return true;
  });

  const continueLesson = (enrollment: Enrollment) => {
    if (enrollment.course?.lessons && enrollment.course.lessons.length > 0) {
      const firstLesson = enrollment.course.lessons[0];
      router.push(`/learn/${enrollment.courseId}/${firstLesson.id}`);
    } else {
      router.push(`/courses/${enrollment.courseId}`);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'var(--success-color)';
    if (progress > 50) return 'var(--primary-color)';
    if (progress > 0) return 'var(--warning-color)';
    return 'var(--muted)';
  };

  if (authLoading || !user) {
    return (
      <main className="role-dashboard student-dashboard">
        <DashboardSkeleton />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="role-dashboard student-dashboard">
        <DashboardSkeleton />
      </main>
    );
  }

  return (
    <main className="role-dashboard student-dashboard">
      {/* Animated Background */}
      <div className="dashboard-bg-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      {/* Welcome Hero Section */}
      <section className="dashboard-hero animate-fade-in">
        <div className="hero-content">
          <div className="hero-text">
            <span className="greeting-badge">
              <span className="wave-emoji">👋</span> {greeting}
            </span>
            <h1 className="hero-title">
              Welcome back, <span className="gradient-text">{user.name || user.email?.split('@')[0] || 'Learner'}</span>!
            </h1>
            <p className="hero-subtitle">
              Continue your learning journey. You're doing great!
            </p>
          </div>
          <div className="hero-avatar">
            <div className="avatar-ring">
              <div className="avatar-inner">
                {(user.name || user.email || 'U').charAt(0).toUpperCase()}
              </div>
            </div>
            <Badge variant="success" className="role-badge-animated">🎓 Student</Badge>
          </div>
        </div>
      </section>

      {error && <ErrorMessage message={error} onRetry={loadDashboard} />}

      {/* Stats Cards with Animation */}
      {stats && (
        <section className="stats-section animate-slide-up">
          <div className="stats-grid-animated">
            <div className="stat-card-animated" style={{ '--delay': '0.1s' } as React.CSSProperties}>
              <div className="stat-card-inner">
                <div className="stat-icon-wrapper blue">
                  <span className="stat-icon">📚</span>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalEnrollments}</span>
                  <span className="stat-label">Enrolled Courses</span>
                </div>
                <div className="stat-trend up">
                  <span>Active</span>
                </div>
              </div>
            </div>

            <div className="stat-card-animated" style={{ '--delay': '0.2s' } as React.CSSProperties}>
              <div className="stat-card-inner">
                <div className="stat-icon-wrapper orange">
                  <span className="stat-icon">🔄</span>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.inProgress}</span>
                  <span className="stat-label">In Progress</span>
                </div>
                <div className="stat-trend">
                  <span>Keep going!</span>
                </div>
              </div>
            </div>

            <div className="stat-card-animated" style={{ '--delay': '0.3s' } as React.CSSProperties}>
              <div className="stat-card-inner">
                <div className="stat-icon-wrapper green">
                  <span className="stat-icon">✅</span>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.completed}</span>
                  <span className="stat-label">Completed</span>
                </div>
                <div className="stat-trend up">
                  <span>Great job!</span>
                </div>
              </div>
            </div>

            <div className="stat-card-animated" style={{ '--delay': '0.4s' } as React.CSSProperties}>
              <div className="stat-card-inner">
                <div className="stat-icon-wrapper purple">
                  <span className="stat-icon">⏰</span>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalHours || 0}h</span>
                  <span className="stat-label">Learning Time</span>
                </div>
                <div className="stat-trend">
                  <span>This month</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Learning Progress Overview */}
      {enrollments.length > 0 && (
        <section className="progress-overview animate-slide-up" style={{ '--delay': '0.3s' } as React.CSSProperties}>
          <div className="section-header-fancy">
            <h2>
              <span className="section-icon">📊</span>
              Learning Progress
            </h2>
          </div>
          <div className="progress-ring-container">
            <div className="progress-ring-wrapper">
              <svg className="progress-ring" viewBox="0 0 120 120">
                <circle className="progress-ring-bg" cx="60" cy="60" r="52" />
                <circle 
                  className="progress-ring-fill" 
                  cx="60" 
                  cy="60" 
                  r="52"
                  style={{ 
                    strokeDasharray: `${2 * Math.PI * 52}`,
                    strokeDashoffset: `${2 * Math.PI * 52 * (1 - (stats?.completed || 0) / Math.max(stats?.totalEnrollments || 1, 1))}`
                  }}
                />
              </svg>
              <div className="progress-ring-text">
                <span className="progress-percentage">
                  {Math.round(((stats?.completed || 0) / Math.max(stats?.totalEnrollments || 1, 1)) * 100)}%
                </span>
                <span className="progress-label">Complete</span>
              </div>
            </div>
            <div className="progress-stats">
              <div className="progress-stat-item">
                <span className="progress-stat-value">{stats?.completed || 0}</span>
                <span className="progress-stat-label">Courses Completed</span>
              </div>
              <div className="progress-stat-item">
                <span className="progress-stat-value">{stats?.inProgress || 0}</span>
                <span className="progress-stat-label">In Progress</span>
              </div>
              <div className="progress-stat-item">
                <span className="progress-stat-value">{(stats?.totalEnrollments || 0) - (stats?.completed || 0) - (stats?.inProgress || 0)}</span>
                <span className="progress-stat-label">Not Started</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* My Courses Section */}
      <section className="courses-section animate-slide-up" style={{ '--delay': '0.4s' } as React.CSSProperties}>
        <div className="section-header-fancy">
          <div className="section-title-group">
            <h2>
              <span className="section-icon">🎓</span>
              My Courses
            </h2>
            <div className="course-tabs">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({enrollments.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'inProgress' ? 'active' : ''}`}
                onClick={() => setActiveTab('inProgress')}
              >
                In Progress ({enrollments.filter(e => (e.progress || 0) > 0 && (e.progress || 0) < 100).length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}
              >
                Completed ({enrollments.filter(e => e.progress === 100).length})
              </button>
            </div>
          </div>
          <Link href="/courses" className="btn-browse-fancy">
            <span>Browse All</span>
            <span className="arrow">→</span>
          </Link>
        </div>

        {isLoading && (
          <div className="loading-state">
            <LoadingSpinner size="md" />
          </div>
        )}

        {!isLoading && filteredEnrollments.length === 0 && (
          <EmptyState
            title={activeTab === 'all' ? "No courses yet" : `No ${activeTab === 'inProgress' ? 'in progress' : 'completed'} courses`}
            description={activeTab === 'all' ? "Start your learning journey by enrolling in a course" : "Keep learning to see courses here"}
            icon="📚"
            action={
              <Link href="/courses" className="button button-primary">
                Explore Courses
              </Link>
            }
          />
        )}

        {!isLoading && filteredEnrollments.length > 0 && (
          <div className="courses-grid-animated">
            {filteredEnrollments.map((enrollment, index) => (
              <div 
                key={enrollment.id} 
                className="course-card-animated"
                style={{ '--delay': `${0.1 * index}s` } as React.CSSProperties}
              >
                <div className="course-card-header">
                  <div className="course-thumbnail">
                    <span className="course-emoji">
                      {enrollment.course?.category === 'programming' ? '💻' :
                       enrollment.course?.category === 'design' ? '🎨' :
                       enrollment.course?.category === 'business' ? '💼' :
                       enrollment.course?.category === 'marketing' ? '📢' : '📖'}
                    </span>
                  </div>
                  <div className="course-badges">
                    <Badge variant="secondary">{enrollment.course?.level || 'Beginner'}</Badge>
                    {enrollment.progress === 100 && (
                      <Badge variant="success">
                        <span>✓</span> Completed
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="course-card-body">
                  <span className="course-category">{enrollment.course?.category || 'General'}</span>
                  <h3 className="course-title">{enrollment.course?.title || 'Course'}</h3>
                  
                  <div className="course-progress-section">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span className="progress-value" style={{ color: getProgressColor(enrollment.progress || 0) }}>
                        {enrollment.progress || 0}%
                      </span>
                    </div>
                    <div className="progress-bar-wrapper">
                      <div 
                        className="progress-bar-fill"
                        style={{ 
                          width: `${enrollment.progress || 0}%`,
                          backgroundColor: getProgressColor(enrollment.progress || 0)
                        }}
                      />
                    </div>
                  </div>

                  <div className="course-meta">
                    <span className="meta-item">
                      <span className="meta-icon">📝</span>
                      {enrollment.course?.lessons?.length || 0} Lessons
                    </span>
                  </div>
                </div>

                <div className="course-card-footer">
                  <button 
                    onClick={() => continueLesson(enrollment)}
                    className="btn-continue"
                  >
                    {enrollment.progress && enrollment.progress > 0 ? 
                      (enrollment.progress === 100 ? '🔄 Review' : '▶️ Continue') : 
                      '🚀 Start'}
                  </button>
                  <Link href={`/courses/${enrollment.courseId}`} className="btn-details">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recommended Courses */}
      {recommendedCourses.length > 0 && (
        <section className="recommended-section animate-slide-up" style={{ '--delay': '0.5s' } as React.CSSProperties}>
          <div className="section-header-fancy">
            <h2>
              <span className="section-icon">✨</span>
              Recommended for You
            </h2>
            <Link href="/courses" className="btn-browse-fancy">
              <span>View All</span>
              <span className="arrow">→</span>
            </Link>
          </div>

          <div className="recommended-grid">
            {recommendedCourses.map((course, index) => (
              <Link 
                key={course.id} 
                href={`/courses/${course.id}`} 
                className="recommended-card"
                style={{ '--delay': `${0.1 * index}s` } as React.CSSProperties}
              >
                <div className="recommended-card-inner">
                  <div className="recommended-thumbnail">
                    <span className="course-emoji-large">
                      {course.category === 'programming' ? '💻' :
                       course.category === 'design' ? '🎨' :
                       course.category === 'business' ? '💼' :
                       course.category === 'marketing' ? '📢' : '📖'}
                    </span>
                  </div>
                  <div className="recommended-content">
                    <div className="recommended-badges">
                      <Badge variant="primary">{course.category}</Badge>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <h3>{course.title}</h3>
                    <p className="course-description">
                      {course.description?.slice(0, 80)}...
                    </p>
                    <div className="recommended-footer">
                      <span className="course-price">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </span>
                      {course.averageRating && Number(course.averageRating) > 0 && (
                        <span className="course-rating">
                          ⭐ {Number(course.averageRating).toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="quick-actions-section animate-slide-up" style={{ '--delay': '0.6s' } as React.CSSProperties}>
        <div className="section-header-fancy">
          <h2>
            <span className="section-icon">⚡</span>
            Quick Actions
          </h2>
        </div>
        <div className="quick-actions-animated">
          <Link href="/profile" className="quick-action-card-fancy">
            <span className="action-icon-fancy">👤</span>
            <span className="action-text">My Profile</span>
            <span className="action-arrow">→</span>
          </Link>
          <Link href="/courses" className="quick-action-card-fancy">
            <span className="action-icon-fancy">🔍</span>
            <span className="action-text">Explore Courses</span>
            <span className="action-arrow">→</span>
          </Link>
          <button className="quick-action-card-fancy" onClick={loadDashboard}>
            <span className="action-icon-fancy">🔄</span>
            <span className="action-text">Refresh Data</span>
            <span className="action-arrow">→</span>
          </button>
        </div>
      </section>
    </main>
  );
}
