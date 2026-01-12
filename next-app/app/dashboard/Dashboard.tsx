'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  enrollmentsAPI, 
  coursesAPI, 
  notificationsAPI,
  Enrollment as EnrollmentType,
  Notification as NotificationType,
  Course as CourseType,
} from '@/lib/api-service';
import styles from './Dashboard.module.css';

// Professional course images from Unsplash by category
const categoryImages: Record<string, string> = {
  programming: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&auto=format',
  coding: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&auto=format',
  web: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop&auto=format',
  development: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&auto=format',
  data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format',
  science: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop&auto=format',
  design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop&auto=format',
  business: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
  marketing: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop&auto=format',
  mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&auto=format',
  default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format',
};

interface DashboardStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHoursLearned: number;
}

export default function DashboardContent() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const [enrollments, setEnrollments] = useState<EnrollmentType[]>([]);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<CourseType[]>([]);
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
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Fetch enrollments
      let enrollmentsData: EnrollmentType[] = [];
      try {
        const res = await enrollmentsAPI.getMyEnrollments();
        enrollmentsData = Array.isArray(res) ? res : [];
      } catch (e) {
        console.log('No enrollments found');
      }

      // Fetch all courses
      let allCourses: CourseType[] = [];
      try {
        const coursesRes = await coursesAPI.getAll();
        allCourses = coursesRes?.courses || [];
      } catch (e) {
        console.log('Failed to fetch courses');
      }

      // Fetch notifications
      let notificationsData: NotificationType[] = [];
      try {
        const notifRes = await notificationsAPI.getAll();
        notificationsData = Array.isArray(notifRes) ? notifRes : [];
      } catch (e) {
        console.log('No notifications');
      }

      setEnrollments(enrollmentsData);
      setNotifications(notificationsData.slice(0, 5));

      // Calculate stats from enrollments
      const completed = enrollmentsData.filter((e) => e.progress === 100 || e.completed).length;
      const inProgress = enrollmentsData.filter(
        (e) => (e.progress || 0) > 0 && (e.progress || 0) < 100 && !e.completed
      ).length;

      setStats({
        totalCourses: enrollmentsData.length,
        completedCourses: completed,
        inProgressCourses: inProgress,
        totalHoursLearned: enrollmentsData.reduce(
          (acc, e) => acc + Math.floor((e.progress || 0) * 0.5),
          0
        ),
      });

      // Recommended courses - those not enrolled
      const enrolledIds = new Set(enrollmentsData.map((e) => e.courseId));
      const recommendations = allCourses
        .filter((c) => !enrolledIds.has(c.id))
        .slice(0, 4);
      setRecommendedCourses(recommendations);

    } catch (err: any) {
      console.error('Dashboard load error:', err);
      setError('Failed to load dashboard data. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter((e) => {
    if (activeTab === 'inProgress') {
      return (e.progress || 0) > 0 && (e.progress || 0) < 100 && !e.completed;
    }
    if (activeTab === 'completed') {
      return e.progress === 100 || e.completed;
    }
    return true;
  });

  const markNotificationAsRead = async (id: number) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const getCategoryIcon = (category?: string) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('programming') || cat.includes('coding')) return 'code';
    if (cat.includes('web')) return 'web';
    if (cat.includes('data') || cat.includes('science')) return 'data';
    if (cat.includes('design')) return 'design';
    if (cat.includes('business')) return 'business';
    return 'course';
  };

  const getCourseImage = (category?: string, thumbnail?: string) => {
    if (thumbnail) return thumbnail;
    const cat = category?.toLowerCase() || '';
    for (const [key, url] of Object.entries(categoryImages)) {
      if (cat.includes(key)) return url;
    }
    return categoryImages.default;
  };

  if (authLoading || (!user && !error)) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error && !isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>!</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={loadDashboardData} className={styles.retryBtn}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      {/* Header Section */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>{greeting}, {user?.firstName || user?.name?.split(' ')[0] || 'Student'}!</h1>
            <p>Continue your learning journey</p>
          </motion.div>
        </div>
      </section>

      <div className={styles.container}>
        {/* Stats Cards */}
        {isLoading ? (
          <div className={styles.statsGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`${styles.statCard} ${styles.skeleton}`}>
                <div className={styles.skeletonIcon}></div>
                <div className={styles.skeletonText}></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className={styles.statsGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.blue}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats?.totalCourses || 0}</span>
                <span className={styles.statLabel}>Enrolled Courses</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.purple}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats?.inProgressCourses || 0}</span>
                <span className={styles.statLabel}>In Progress</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.green}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats?.completedCourses || 0}</span>
                <span className={styles.statLabel}>Completed</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.orange}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats?.totalHoursLearned || 0}h</span>
                <span className={styles.statLabel}>Learning Time</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className={styles.mainGrid}>
          {/* Courses Section */}
          <section className={styles.coursesSection}>
            <div className={styles.sectionHeader}>
              <h2>My Courses</h2>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'inProgress' ? styles.active : ''}`}
                  onClick={() => setActiveTab('inProgress')}
                >
                  In Progress
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'completed' ? styles.active : ''}`}
                  onClick={() => setActiveTab('completed')}
                >
                  Completed
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className={styles.coursesGrid}>
                {[1, 2].map((i) => (
                  <div key={i} className={`${styles.courseCard} ${styles.skeleton}`}>
                    <div className={styles.skeletonImage}></div>
                    <div className={styles.skeletonContent}>
                      <div className={styles.skeletonLine}></div>
                      <div className={styles.skeletonLine}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEnrollments.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3>No courses yet</h3>
                <p>Start learning by enrolling in a course</p>
                <Link href="/courses" className={styles.browseBtn}>
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className={styles.coursesGrid}>
                <AnimatePresence mode="popLayout">
                  {filteredEnrollments.map((enrollment, index) => (
                    <motion.div
                      key={enrollment.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={`/courses/${enrollment.course?.slug || enrollment.courseId}`}
                        className={styles.courseCard}
                      >
                        <div className={styles.courseImage}>
                          <Image
                            src={getCourseImage(enrollment.course?.category, enrollment.course?.thumbnail)}
                            alt={enrollment.course?.title || 'Course'}
                            width={400}
                            height={200}
                            className={styles.courseImg}
                            unoptimized
                          />
                          {(enrollment.progress === 100 || enrollment.completed) && (
                            <span className={styles.completedBadge}>Completed</span>
                          )}
                        </div>
                        <div className={styles.courseContent}>
                          <span className={styles.categoryBadge}>
                            {enrollment.course?.category || 'Course'}
                          </span>
                          <h3>{enrollment.course?.title || 'Untitled Course'}</h3>
                          <div className={styles.progressSection}>
                            <div className={styles.progressBar}>
                              <div
                                className={styles.progressFill}
                                style={{ width: `${enrollment.progress || 0}%` }}
                              />
                            </div>
                            <span className={styles.progressText}>
                              {enrollment.progress || 0}% complete
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Notifications */}
            <div className={styles.sidebarCard}>
              <h3>
                <svg className={styles.sidebarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                Notifications
                {notifications.filter((n) => !n.isRead).length > 0 && (
                  <span className={styles.notificationBadge}>
                    {notifications.filter((n) => !n.isRead).length}
                  </span>
                )}
              </h3>
              {notifications.length === 0 ? (
                <p className={styles.emptyNotifications}>No new notifications</p>
              ) : (
                <ul className={styles.notificationsList}>
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={`${styles.notificationItem} ${
                        notification.isRead ? styles.read : ''
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <span className={styles.notificationTitle}>
                        {notification.message}
                      </span>
                      <span className={styles.notificationTime}>
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recommended Courses */}
            {recommendedCourses.length > 0 && (
              <div className={styles.sidebarCard}>
                <h3>
                  <svg className={styles.sidebarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4M12 8h.01"/>
                  </svg>
                  Recommended
                </h3>
                <ul className={styles.recommendedList}>
                  {recommendedCourses.map((course) => (
                    <li key={course.id}>
                      <Link
                        href={`/courses/${course.slug || course.id}`}
                        className={styles.recommendedItem}
                      >
                        <Image
                          src={getCourseImage(course.category, course.thumbnail)}
                          alt={course.title}
                          width={48}
                          height={48}
                          className={styles.recommendedImg}
                          unoptimized
                        />
                        <div className={styles.recommendedInfo}>
                          <span className={styles.recommendedTitle}>
                            {course.title}
                          </span>
                          <span className={styles.recommendedMeta}>
                            {course.lessons?.length || 0} lessons
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Actions */}
            <div className={styles.sidebarCard}>
              <h3>
                <svg className={styles.sidebarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Quick Actions
              </h3>
              <div className={styles.quickActions}>
                <Link href="/courses" className={styles.quickAction}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  Browse Courses
                </Link>
                <Link href={"/chatbot" as any} className={styles.quickAction}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                  AI Assistant
                </Link>
                <Link href={"/profile" as any} className={styles.quickAction}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Edit Profile
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
