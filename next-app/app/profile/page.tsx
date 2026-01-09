'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi, enrollmentsApi, coursesApi } from '../../lib/api';
import { User, Enrollment, Course } from '../../lib/api-types';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner, ErrorMessage, Badge, ProgressBar } from '../../components/ui';
import { ProfileSkeleton } from '../../components/PageLoader';

type ProfileTab = 'overview' | 'courses' | 'settings' | 'achievements';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  
  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const profileData = await authApi.getProfile();
      setProfile(profileData);

      if (user?.role === 'student') {
        const enrollmentsData = await enrollmentsApi.getMyEnrollments();
        setEnrollments(enrollmentsData);
      } else if (user?.role === 'instructor') {
        const [enrollmentsData, coursesData] = await Promise.all([
          enrollmentsApi.getMyEnrollments().catch(() => []),
          coursesApi.getMyCourses().catch(() => []),
        ]);
        setEnrollments(enrollmentsData);
        setInstructorCourses(coursesData);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    try {
      setChangingPassword(true);
      await authApi.changePassword(currentPassword, newPassword);
      setPasswordSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'admin':
        return { color: 'danger', icon: '🛡️', gradient: 'admin', label: 'Administrator' };
      case 'instructor':
        return { color: 'primary', icon: '📚', gradient: 'instructor', label: 'Instructor' };
      default:
        return { color: 'success', icon: '🎓', gradient: 'student', label: 'Student' };
    }
  };

  const calculateStats = () => {
    const completed = enrollments.filter(e => e.progress === 100).length;
    const inProgress = enrollments.filter(e => (e.progress || 0) > 0 && (e.progress || 0) < 100).length;
    const totalProgress = enrollments.length > 0 
      ? Math.round(enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length)
      : 0;
    return { completed, inProgress, totalProgress };
  };

  const stats = calculateStats();
  const roleConfig = getRoleConfig(profile?.role || 'student');

  if (isLoading) {
    return (
      <main className="profile-page-fancy">
        <ProfileSkeleton />
      </main>
    );
  }

  if (error) {
    return (
      <main className="profile-page-fancy">
        <ErrorMessage message={error} onRetry={loadData} />
      </main>
    );
  }

  return (
    <main className="profile-page-fancy">
      {/* Animated Background */}
      <div className={`profile-bg-animation ${roleConfig.gradient}`}>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      {/* Profile Hero */}
      <section className="profile-hero animate-fade-in">
        <div className="profile-hero-content">
          <div className={`profile-avatar-wrapper ${roleConfig.gradient}`}>
            <div className="avatar-glow"></div>
            <div className="profile-avatar-fancy">
              {(profile?.name || profile?.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="avatar-ring-animated"></div>
          </div>
          
          <div className="profile-info-fancy">
            <Badge variant={roleConfig.color as any} className="role-badge-profile">
              {roleConfig.icon} {roleConfig.label}
            </Badge>
            <h1 className={`profile-name gradient-text-${roleConfig.gradient}`}>
              {profile?.name || profile?.email?.split('@')[0] || 'User'}
            </h1>
            <p className="profile-email">{profile?.email}</p>
            <p className="profile-joined">
              <span className="join-icon">📅</span>
              Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              }) : 'N/A'}
            </p>
          </div>

          <div className="profile-quick-stats">
            {user?.role === 'student' && (
              <>
                <div className="quick-stat">
                  <span className="quick-stat-value">{enrollments.length}</span>
                  <span className="quick-stat-label">Courses</span>
                </div>
                <div className="quick-stat">
                  <span className="quick-stat-value">{stats.completed}</span>
                  <span className="quick-stat-label">Completed</span>
                </div>
                <div className="quick-stat">
                  <span className="quick-stat-value">{stats.totalProgress}%</span>
                  <span className="quick-stat-label">Avg Progress</span>
                </div>
              </>
            )}
            {user?.role === 'instructor' && (
              <>
                <div className="quick-stat">
                  <span className="quick-stat-value">{instructorCourses.length}</span>
                  <span className="quick-stat-label">Courses Created</span>
                </div>
                <div className="quick-stat">
                  <span className="quick-stat-value">
                    {instructorCourses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0)}
                  </span>
                  <span className="quick-stat-label">Students</span>
                </div>
                <div className="quick-stat">
                  <span className="quick-stat-value">
                    {instructorCourses.length > 0 
                      ? (instructorCourses.reduce((sum, c) => sum + Number(c.averageRating || 0), 0) / instructorCourses.length).toFixed(1)
                      : '0.0'}
                  </span>
                  <span className="quick-stat-label">Avg Rating</span>
                </div>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <div className="quick-stat">
                  <span className="quick-stat-value">∞</span>
                  <span className="quick-stat-label">Access Level</span>
                </div>
                <div className="quick-stat">
                  <span className="quick-stat-value">Full</span>
                  <span className="quick-stat-label">Control</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <nav className="profile-nav animate-slide-up">
        <div className="profile-tabs-fancy">
          {(['overview', 'courses', 'achievements', 'settings'] as ProfileTab[]).map((tab) => (
            <button
              key={tab}
              className={`profile-tab-fancy ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="tab-icon">
                {tab === 'overview' && '📊'}
                {tab === 'courses' && '📚'}
                {tab === 'achievements' && '🏆'}
                {tab === 'settings' && '⚙️'}
              </span>
              <span className="tab-text">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <div className="profile-content animate-fade-in">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-content">
            {/* Stats Grid */}
            <section className="profile-stats-section">
              <h2 className="section-title-fancy">
                <span className="section-icon">📈</span>
                Your Statistics
              </h2>
              <div className="profile-stats-grid">
                <div className="profile-stat-card" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                  <div className="stat-icon-fancy blue">📚</div>
                  <div className="stat-details">
                    <span className="stat-value-fancy">{enrollments.length}</span>
                    <span className="stat-label-fancy">Enrolled Courses</span>
                  </div>
                </div>
                <div className="profile-stat-card" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                  <div className="stat-icon-fancy green">✅</div>
                  <div className="stat-details">
                    <span className="stat-value-fancy">{stats.completed}</span>
                    <span className="stat-label-fancy">Completed</span>
                  </div>
                </div>
                <div className="profile-stat-card" style={{ '--delay': '0.3s' } as React.CSSProperties}>
                  <div className="stat-icon-fancy orange">🔄</div>
                  <div className="stat-details">
                    <span className="stat-value-fancy">{stats.inProgress}</span>
                    <span className="stat-label-fancy">In Progress</span>
                  </div>
                </div>
                <div className="profile-stat-card" style={{ '--delay': '0.4s' } as React.CSSProperties}>
                  <div className="stat-icon-fancy purple">🎓</div>
                  <div className="stat-details">
                    <span className="stat-value-fancy">{stats.completed}</span>
                    <span className="stat-label-fancy">Certificates</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Progress Ring */}
            <section className="progress-section">
              <h2 className="section-title-fancy">
                <span className="section-icon">🎯</span>
                Overall Progress
              </h2>
              <div className="progress-display">
                <div className="progress-ring-large">
                  <svg viewBox="0 0 160 160">
                    <circle className="progress-ring-bg-large" cx="80" cy="80" r="70" />
                    <circle 
                      className="progress-ring-fill-large" 
                      cx="80" 
                      cy="80" 
                      r="70"
                      style={{ 
                        strokeDasharray: `${2 * Math.PI * 70}`,
                        strokeDashoffset: `${2 * Math.PI * 70 * (1 - stats.totalProgress / 100)}`
                      }}
                    />
                  </svg>
                  <div className="progress-ring-center">
                    <span className="progress-value-large">{stats.totalProgress}%</span>
                    <span className="progress-label-large">Complete</span>
                  </div>
                </div>
                <div className="progress-breakdown">
                  <div className="breakdown-item">
                    <span className="breakdown-label">Completed</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill green" style={{ width: `${stats.completed / Math.max(enrollments.length, 1) * 100}%` }}></div>
                    </div>
                    <span className="breakdown-value">{stats.completed}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">In Progress</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill orange" style={{ width: `${stats.inProgress / Math.max(enrollments.length, 1) * 100}%` }}></div>
                    </div>
                    <span className="breakdown-value">{stats.inProgress}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">Not Started</span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill gray" style={{ width: `${(enrollments.length - stats.completed - stats.inProgress) / Math.max(enrollments.length, 1) * 100}%` }}></div>
                    </div>
                    <span className="breakdown-value">{enrollments.length - stats.completed - stats.inProgress}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="profile-actions-section">
              <h2 className="section-title-fancy">
                <span className="section-icon">⚡</span>
                Quick Actions
              </h2>
              <div className="profile-actions-grid">
                {user?.role === 'student' && (
                  <Link href="/dashboard" className="profile-action-card">
                    <span className="action-icon-profile">📊</span>
                    <span className="action-title-profile">Go to Dashboard</span>
                  </Link>
                )}
                {user?.role === 'instructor' && (
                  <Link href="/instructor" className="profile-action-card instructor">
                    <span className="action-icon-profile">📚</span>
                    <span className="action-title-profile">Instructor Panel</span>
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link href="/admin" className="profile-action-card admin">
                    <span className="action-icon-profile">🛡️</span>
                    <span className="action-title-profile">Admin Panel</span>
                  </Link>
                )}
                <Link href="/courses" className="profile-action-card">
                  <span className="action-icon-profile">🔍</span>
                  <span className="action-title-profile">Browse Courses</span>
                </Link>
                <button onClick={() => setActiveTab('settings')} className="profile-action-card">
                  <span className="action-icon-profile">⚙️</span>
                  <span className="action-title-profile">Settings</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="courses-content">
            <h2 className="section-title-fancy">
              <span className="section-icon">📚</span>
              {user?.role === 'instructor' ? 'My Created Courses' : 'My Enrolled Courses'}
            </h2>
            
            {user?.role === 'instructor' && instructorCourses.length > 0 && (
              <div className="profile-courses-grid">
                {instructorCourses.map((course, index) => (
                  <div key={course.id} className="profile-course-card" style={{ '--delay': `${0.1 * index}s` } as React.CSSProperties}>
                    <div className="course-card-header-profile">
                      <span className="course-emoji-profile">
                        {course.category === 'programming' ? '💻' : '📖'}
                      </span>
                      <Badge variant={course.isActive ? 'success' : 'warning'}>
                        {course.isActive ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <h3>{course.title}</h3>
                    <div className="course-stats-profile">
                      <span>👥 {course.enrollmentCount || 0} students</span>
                      <span>⭐ {Number(course.averageRating || 0).toFixed(1)}</span>
                    </div>
                    <Link href={`/courses/${course.id}`} className="course-link-profile">
                      View Course →
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {enrollments.length > 0 && (
              <div className="profile-courses-grid">
                {enrollments.map((enrollment, index) => (
                  <div key={enrollment.id} className="profile-course-card" style={{ '--delay': `${0.1 * index}s` } as React.CSSProperties}>
                    <div className="course-card-header-profile">
                      <span className="course-emoji-profile">📚</span>
                      <Badge variant={enrollment.progress === 100 ? 'success' : 'secondary'}>
                        {enrollment.progress === 100 ? 'Completed' : `${enrollment.progress || 0}%`}
                      </Badge>
                    </div>
                    <h3>{enrollment.course?.title || 'Course'}</h3>
                    <div className="course-progress-profile">
                      <div className="progress-bar-profile">
                        <div className="progress-fill-profile" style={{ width: `${enrollment.progress || 0}%` }}></div>
                      </div>
                    </div>
                    <Link href={`/courses/${enrollment.courseId}`} className="course-link-profile">
                      {enrollment.progress === 100 ? 'Review' : 'Continue'} →
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {enrollments.length === 0 && instructorCourses.length === 0 && (
              <div className="empty-state-profile">
                <span className="empty-icon">📚</span>
                <h3>No courses yet</h3>
                <p>Start learning by enrolling in a course</p>
                <Link href="/courses" className="button button-primary">
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="achievements-content">
            <h2 className="section-title-fancy">
              <span className="section-icon">🏆</span>
              Achievements
            </h2>
            <div className="achievements-grid">
              <div className={`achievement-card ${stats.completed >= 1 ? 'unlocked' : 'locked'}`}>
                <span className="achievement-icon">🎯</span>
                <h3>First Steps</h3>
                <p>Complete your first course</p>
                {stats.completed >= 1 ? (
                  <span className="achievement-status unlocked">✓ Unlocked</span>
                ) : (
                  <span className="achievement-status locked">🔒 Locked</span>
                )}
              </div>
              <div className={`achievement-card ${stats.completed >= 5 ? 'unlocked' : 'locked'}`}>
                <span className="achievement-icon">📚</span>
                <h3>Bookworm</h3>
                <p>Complete 5 courses</p>
                {stats.completed >= 5 ? (
                  <span className="achievement-status unlocked">✓ Unlocked</span>
                ) : (
                  <span className="achievement-status locked">🔒 {stats.completed}/5</span>
                )}
              </div>
              <div className={`achievement-card ${enrollments.length >= 10 ? 'unlocked' : 'locked'}`}>
                <span className="achievement-icon">🎓</span>
                <h3>Dedicated Learner</h3>
                <p>Enroll in 10 courses</p>
                {enrollments.length >= 10 ? (
                  <span className="achievement-status unlocked">✓ Unlocked</span>
                ) : (
                  <span className="achievement-status locked">🔒 {enrollments.length}/10</span>
                )}
              </div>
              <div className={`achievement-card ${stats.totalProgress === 100 ? 'unlocked' : 'locked'}`}>
                <span className="achievement-icon">⭐</span>
                <h3>Perfectionist</h3>
                <p>100% average progress</p>
                {stats.totalProgress === 100 ? (
                  <span className="achievement-status unlocked">✓ Unlocked</span>
                ) : (
                  <span className="achievement-status locked">🔒 {stats.totalProgress}%</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="settings-content">
            <section className="settings-section">
              <h2 className="section-title-fancy">
                <span className="section-icon">👤</span>
                Account Information
              </h2>
              <div className="settings-card">
                <div className="settings-item">
                  <label>Full Name</label>
                  <p>{profile?.name || 'Not set'}</p>
                </div>
                <div className="settings-item">
                  <label>Email Address</label>
                  <p>{profile?.email}</p>
                </div>
                <div className="settings-item">
                  <label>Account Type</label>
                  <p style={{ textTransform: 'capitalize' }}>{profile?.role}</p>
                </div>
                <div className="settings-item">
                  <label>Account Status</label>
                  <Badge variant={profile?.isActive ? 'success' : 'warning'}>
                    {profile?.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </section>

            <section className="settings-section">
              <h2 className="section-title-fancy">
                <span className="section-icon">🔒</span>
                Security
              </h2>
              <div className="settings-card">
                {passwordSuccess && (
                  <div className="success-message">
                    <span>✓</span> {passwordSuccess}
                  </div>
                )}

                {!showPasswordForm ? (
                  <button 
                    onClick={() => setShowPasswordForm(true)}
                    className="btn-change-password"
                  >
                    <span>🔑</span> Change Password
                  </button>
                ) : (
                  <form onSubmit={handlePasswordChange} className="password-form">
                    {passwordError && (
                      <div className="error-message">
                        <span>!</span> {passwordError}
                      </div>
                    )}
                    
                    <div className="form-group-fancy">
                      <label>Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        required
                      />
                    </div>
                    
                    <div className="form-group-fancy">
                      <label>New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                        minLength={6}
                      />
                    </div>
                    
                    <div className="form-group-fancy">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                    
                    <div className="form-actions-fancy">
                      <button type="button" onClick={() => setShowPasswordForm(false)} className="btn-cancel-fancy">
                        Cancel
                      </button>
                      <button type="submit" className="btn-submit-fancy" disabled={changingPassword}>
                        {changingPassword ? 'Changing...' : 'Change Password'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </section>

            <section className="settings-section">
              <h2 className="section-title-fancy">
                <span className="section-icon">🚪</span>
                Session
              </h2>
              <div className="settings-card">
                <button onClick={handleLogout} className="btn-logout-fancy">
                  <span>🚪</span> Logout
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
