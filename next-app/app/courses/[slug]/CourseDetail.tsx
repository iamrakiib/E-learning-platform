'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { coursesApi, enrollmentsApi } from '@/lib/api';
import styles from './CourseDetail.module.css';

interface Lesson {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  order: number;
  videoUrl?: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  price?: number;
  instructor?: any;
  instructorUser?: any;
  lessons?: Lesson[];
  lessonCount?: number;
  enrollmentCount?: number;
  averageRating?: number;
  reviewCount?: number;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  userId?: number;
  user?: { id: number; name: string };
  createdAt: string;
}

interface CourseDetailProps {
  initialCourse: Course;
  courseId: number;
}

export default function CourseDetail({ initialCourse, courseId }: CourseDetailProps) {
  const [course, setCourse] = useState<Course>(initialCourse);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadReviews();
    if (user) {
      checkEnrollment();
    }
  }, [user]);

  const loadReviews = async () => {
    try {
      const data = await coursesApi.getReviews(courseId);
      setReviews(data || []);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  const checkEnrollment = async () => {
    try {
      const enrollments = await enrollmentsApi.getMyEnrollments();
      const enrollment = enrollments.find((e: any) => e.courseId === courseId);
      setIsEnrolled(!!enrollment);
    } catch (err) {
      console.error('Failed to check enrollment:', err);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setEnrolling(true);
      await enrollmentsApi.enroll(courseId);
      setIsEnrolled(true);
    } catch (err: any) {
      alert(err.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setSubmittingReview(true);
      await coursesApi.addReview(courseId, { rating: reviewRating, comment: reviewComment });
      setShowReviewForm(false);
      setReviewComment('');
      setReviewRating(5);
      loadReviews();
    } catch (err: any) {
      alert(err.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const instructor = course.instructorUser || course.instructor;
  const lessons = course.lessons || [];
  const averageRating = Number(course.averageRating) || 0;

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
        </div>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.breadcrumb}>
              <Link href="/courses">Courses</Link>
              <span>/</span>
              <span>{course.category}</span>
            </div>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.description}>{course.description}</p>
            
            <div className={styles.meta}>
              <div className={styles.rating}>
                {'★'.repeat(Math.round(averageRating))}
                <span>{averageRating.toFixed(1)}</span>
                <span>({course.reviewCount || reviews.length} reviews)</span>
              </div>
              <div className={styles.stats}>
                <span>{course.lessonCount || lessons.length} lessons</span>
                <span>{course.enrollmentCount || 0} students</span>
                <span>{course.level}</span>
              </div>
            </div>

            {instructor && (
              <div className={styles.instructor}>
                <div className={styles.instructorAvatar}>
                  {instructor.name?.charAt(0) || 'I'}
                </div>
                <div>
                  <span className={styles.instructorLabel}>Instructor</span>
                  <span className={styles.instructorName}>
                    {instructor.name || 'Unknown Instructor'}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Enrollment Card */}
        <motion.div
          className={styles.enrollCard}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.enrollCardImage}>
            <div className={styles.placeholderIcon}>
              {course.category === 'programming' && 'PRG'}
              {course.category === 'web development' && 'WEB'}
              {course.category === 'data science' && 'DS'}
              {!['programming', 'web development', 'data science'].includes(course.category?.toLowerCase() || '') && 'CRS'}
            </div>
          </div>
          <div className={styles.enrollCardContent}>
            <div className={styles.price}>
              {course.price ? `$${course.price}` : 'Free'}
            </div>
            
            {isEnrolled ? (
              <Link href={`/dashboard` as any} className={styles.enrollBtn}>
                Continue Learning →
              </Link>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className={styles.enrollBtn}
              >
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>
            )}

            <ul className={styles.features}>
              <li>✓ Full lifetime access</li>
              <li>✓ Access on mobile and desktop</li>
              <li>✓ Certificate of completion</li>
              <li>✓ {lessons.length} lessons included</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className={styles.content}>
        <div className={styles.container}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'curriculum' ? styles.active : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.overview}
              >
                <h2>About This Course</h2>
                <p>{course.description}</p>
                
                <h3>What You&apos;ll Learn</h3>
                <ul className={styles.learningPoints}>
                  <li>✓ Master the fundamentals of {course.category}</li>
                  <li>✓ Build real-world projects</li>
                  <li>✓ Learn industry best practices</li>
                  <li>✓ Get hands-on experience</li>
                </ul>

                <h3>Requirements</h3>
                <ul>
                  <li>Basic understanding of programming concepts</li>
                  <li>A computer with internet access</li>
                  <li>Willingness to learn and practice</li>
                </ul>
              </motion.div>
            )}

            {activeTab === 'curriculum' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.curriculum}
              >
                <h2>Course Curriculum</h2>
                <p className={styles.curriculumInfo}>
                  {lessons.length} lessons • Approximately {lessons.length * 15} minutes
                </p>
                
                {lessons.length === 0 ? (
                  <p className={styles.noLessons}>No lessons available yet.</p>
                ) : (
                  <div className={styles.lessonsList}>
                    {lessons.map((lesson, index) => (
                      <div key={lesson.id} className={styles.lessonItem}>
                        <div className={styles.lessonNumber}>{index + 1}</div>
                        <div className={styles.lessonInfo}>
                          <h4>{lesson.title}</h4>
                          {lesson.description && (
                            <p>{lesson.description}</p>
                          )}
                        </div>
                        <div className={styles.lessonDuration}>
                          {lesson.duration || 15} min
                        </div>
                        {!isEnrolled && index > 0 && (
                          <span className={styles.lockIcon}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                            </svg>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.reviews}
              >
                <div className={styles.reviewsHeader}>
                  <h2>Student Reviews</h2>
                  {user && isEnrolled && (
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className={styles.writeReviewBtn}
                    >
                      {showReviewForm ? 'Cancel' : 'Write a Review'}
                    </button>
                  )}
                </div>

                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
                    <div className={styles.ratingInput}>
                      <label>Your Rating</label>
                      <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className={star <= reviewRating ? styles.starActive : ''}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label>Your Review</label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience with this course..."
                        rows={4}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className={styles.submitReviewBtn}
                    >
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                )}

                {reviews.length === 0 ? (
                  <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>
                ) : (
                  <div className={styles.reviewsList}>
                    {reviews.map((review) => (
                      <div key={review.id} className={styles.reviewItem}>
                        <div className={styles.reviewHeader}>
                          <div className={styles.reviewerAvatar}>
                            {review.user?.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <h4>{review.user?.name || 'Anonymous'}</h4>
                            <div className={styles.reviewRating}>
                              {'★'.repeat(review.rating)}
                            </div>
                          </div>
                          <span className={styles.reviewDate}>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className={styles.reviewText}>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
