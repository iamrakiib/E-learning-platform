'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { coursesApi, enrollmentsApi } from '../../../lib/api';
import { Course, Review, Enrollment, LessonProgress } from '../../../lib/api-types';
import { useAuth } from '../../../contexts/AuthContext';
import { LoadingSpinner, ErrorMessage, StarRating, Badge, Tabs, EmptyState, ProgressBar } from '../../../components/ui';

type CoursePageProps = {
  params: { slug: string };
};

export default function CoursePage({ params }: CoursePageProps) {
  const courseId = parseInt(params.slug);
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userEnrollment, setUserEnrollment] = useState<Enrollment | null>(null);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [editingReview, setEditingReview] = useState(false);
  const [deletingReview, setDeletingReview] = useState(false);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isNaN(courseId)) {
      loadCourse();
      loadReviews();
      if (user) {
        checkEnrollment();
      }
    }
  }, [courseId, user]);

  // Check if user has already reviewed and store their review
  useEffect(() => {
    if (user && reviews.length > 0) {
      const existingReview = reviews.find(r => r.userId === user.id || r.user?.id === user.id);
      setHasReviewed(!!existingReview);
      setUserReview(existingReview || null);
    } else {
      setHasReviewed(false);
      setUserReview(null);
    }
  }, [user, reviews]);

  const loadCourse = async () => {
    try {
      setIsLoading(true);
      // Try to get detailed course info first (includes lessons)
      try {
        const data = await coursesApi.getDetailed(courseId);
        setCourse(data);
      } catch {
        // Fallback to basic endpoint
        const data = await coursesApi.getById(courseId);
        setCourse(data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load course');
    } finally {
      setIsLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const data = await coursesApi.getReviews(courseId);
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  const checkEnrollment = async () => {
    try {
      const enrollments = await enrollmentsApi.getMyEnrollments();
      const enrollment = enrollments.find((e: Enrollment) => e.courseId === courseId);
      if (enrollment) {
        setUserEnrollment(enrollment);
        // Fetch lesson progress
        loadLessonProgress();
      }
    } catch (err) {
      console.error('Failed to check enrollment:', err);
    }
  };

  const loadLessonProgress = async () => {
    try {
      const progress = await enrollmentsApi.getLessonProgress(courseId);
      setLessonProgress(progress);
    } catch (err) {
      console.error('Failed to load lesson progress:', err);
    }
  };

  // Role-based enrollment checks
  const canEnroll = (): boolean => {
    if (!user) return true; // Will redirect to login
    if (user.role === 'admin') return false;
    // Check if user is the instructor of this course
    const instructorId = course?.instructorUser?.id || (typeof course?.instructor === 'object' ? course.instructor.id : null);
    if (user.role === 'instructor' && instructorId === user.id) return false;
    return !userEnrollment;
  };

  const getEnrollmentMessage = (): string | null => {
    if (!user) return null;
    if (user.role === 'admin') return 'Administrators cannot enroll in courses. Please use a student account to take courses.';
    const instructorId = course?.instructorUser?.id || (typeof course?.instructor === 'object' ? course.instructor.id : null);
    if (user.role === 'instructor' && instructorId === user.id) {
      return 'You are the instructor of this course. You can manage it from your dashboard.';
    }
    return null;
  };

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!canEnroll()) {
      return;
    }

    try {
      setEnrolling(true);
      await enrollmentsApi.enroll(courseId);
      setUserEnrollment({ courseId, status: 'active' } as Enrollment);
      loadCourse(); // Refresh enrollment count
      loadLessonProgress();
    } catch (err: any) {
      alert(err.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSubmittingReview(true);
      if (editingReview && userReview) {
        // Update existing review
        await coursesApi.updateReview(courseId, userReview.id, { rating: reviewRating, comment: reviewComment });
      } else {
        // Create new review
        await coursesApi.addReview(courseId, { rating: reviewRating, comment: reviewComment });
      }
      setShowReviewForm(false);
      setEditingReview(false);
      setReviewComment('');
      setReviewRating(5);
      setHasReviewed(true);
      loadReviews();
      loadCourse(); // Refresh to get updated rating
    } catch (err: any) {
      alert(err.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleEditReview = () => {
    if (userReview) {
      setReviewRating(userReview.rating);
      setReviewComment(userReview.comment);
      setEditingReview(true);
      setShowReviewForm(true);
    }
  };

  const handleDeleteReview = async () => {
    if (!userReview || !confirm('Are you sure you want to delete your review?')) return;

    try {
      setDeletingReview(true);
      await coursesApi.deleteReview(courseId, userReview.id);
      setHasReviewed(false);
      setUserReview(null);
      loadReviews();
      loadCourse(); // Refresh to get updated rating
    } catch (err: any) {
      alert(err.message || 'Failed to delete review');
    } finally {
      setDeletingReview(false);
    }
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
    setEditingReview(false);
    setReviewComment('');
    setReviewRating(5);
  };

  const startLearning = () => {
    if (course?.lessons && course.lessons.length > 0) {
      // Find the first incomplete lesson or start from the beginning
      const sortedLessons = [...course.lessons].sort((a, b) => a.order - b.order);
      const nextLesson = sortedLessons.find(lesson => !isLessonCompleted(lesson.id)) || sortedLessons[0];
      router.push(`/learn/${courseId}/${nextLesson.id}`);
    }
  };

  // Lesson progress helpers
  const isLessonCompleted = (lessonId: number): boolean => {
    return lessonProgress.some(lp => lp.lessonId === lessonId && lp.completed);
  };

  const getCompletedLessonsCount = (): number => {
    return lessonProgress.filter(lp => lp.completed).length;
  };

  const getProgressPercentage = (): number => {
    if (!course?.lessons || course.lessons.length === 0) return 0;
    return Math.round((getCompletedLessonsCount() / course.lessons.length) * 100);
  };

  // Rating distribution calculation
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      if (distribution[review.rating as keyof typeof distribution] !== undefined) {
        distribution[review.rating as keyof typeof distribution]++;
      }
    });
    return distribution;
  };

  if (isLoading) {
    return (
      <main className="course-detail-page">
        <div className="course-loading">
          <LoadingSpinner size="lg" />
          <p>Loading course...</p>
        </div>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="course-detail-page">
        <ErrorMessage 
          message={error || 'Course not found'} 
          onRetry={loadCourse}
        />
      </main>
    );
  }

  const totalDuration = course.lessons?.reduce((sum, l) => sum + (l.duration || 0), 0) || 0;
  const lessonCount = course.lessons?.length || 0;
  const ratingDistribution = getRatingDistribution();
  const enrollmentMessage = getEnrollmentMessage();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: `Curriculum (${lessonCount})` },
    { id: 'reviews', label: `Reviews (${reviews.length})` },
    { id: 'instructor', label: 'Instructor' },
  ];

  return (
    <main className="course-detail-page">
      {/* Course Hero */}
      <div className="course-hero">
        <div className="course-hero-content">
          <div className="course-hero-badges">
            <Badge variant="primary">{course.category?.replace('_', ' ')}</Badge>
            <Badge variant="secondary">{course.level}</Badge>
            {course.isFeatured && <Badge variant="success">Featured</Badge>}
          </div>
          
          <h1 className="course-hero-title">{course.title}</h1>
          <p className="course-hero-description">{course.description}</p>
          
          <div className="course-hero-meta">
            {course.averageRating && (
              <div className="meta-item">
                <StarRating rating={Number(course.averageRating)} size="sm" />
                <span>{Number(course.averageRating).toFixed(1)} ({reviews.length} reviews)</span>
              </div>
            )}
            <div className="meta-item">
              <span className="meta-icon">👥</span>
              <span>{course.enrollmentCount || 0} students enrolled</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📚</span>
              <span>{lessonCount} lessons</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m total</span>
            </div>
          </div>

          {course.instructor && (
            <div className="course-instructor-preview">
              <div className="instructor-avatar">
                {course.instructorUser 
                  ? (course.instructorUser.firstName?.charAt(0) || 'I').toUpperCase()
                  : typeof course.instructor === 'string' 
                    ? course.instructor.charAt(0).toUpperCase() 
                    : course.instructor.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="instructor-label">Created by</p>
                <p className="instructor-name">
                  {course.instructorUser 
                    ? `${course.instructorUser.firstName} ${course.instructorUser.lastName}`
                    : typeof course.instructor === 'string' 
                      ? course.instructor 
                      : course.instructor.name}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="course-hero-card">
          <div className="course-price-tag">
            {course.price === 0 ? (
              <span className="price-free">Free</span>
            ) : (
              <>
                <span className="price-amount">${course.price}</span>
                <span className="price-label">one-time payment</span>
              </>
            )}
          </div>

          {userEnrollment ? (
            <div className="enrolled-actions">
              {/* Progress Section */}
              <div className="enrollment-progress-section">
                <div className="progress-header">
                  <span className="progress-label">Your Progress</span>
                  <span className="progress-value">{getProgressPercentage()}%</span>
                </div>
                <ProgressBar progress={getProgressPercentage()} showLabel={false} />
                <p className="progress-detail">
                  {getCompletedLessonsCount()} of {lessonCount} lessons completed
                </p>
              </div>
              
              <button onClick={startLearning} className="button button-primary">
                {getProgressPercentage() > 0 ? 'Continue Learning' : 'Start Learning'}
              </button>
              <Link href="/dashboard" className="button button-secondary">
                Go to Dashboard
              </Link>
              <p className="enrolled-status">✓ You're enrolled in this course</p>
            </div>
          ) : enrollmentMessage ? (
            <div className="enrollment-notice">
              <div className="notice-icon">
                {user?.role === 'admin' ? '🔐' : '📝'}
              </div>
              <p className="notice-message">{enrollmentMessage}</p>
              {user?.role === 'instructor' && (
                <Link href="/instructor" className="button button-secondary">
                  Go to Dashboard
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link href="/admin" className="button button-secondary">
                  Admin Dashboard
                </Link>
              )}
            </div>
          ) : (
            <button 
              onClick={handleEnroll} 
              className="button button-primary button-large"
              disabled={enrolling}
            >
              {enrolling ? 'Enrolling...' : course.price === 0 ? 'Enroll for Free' : `Enroll Now - $${course.price}`}
            </button>
          )}

          <div className="course-features">
            <h4>This course includes:</h4>
            <ul>
              <li><span>📹</span> {lessonCount} video lessons</li>
              <li><span>⏰</span> {Math.floor(totalDuration / 60)}h {totalDuration % 60}m of content</li>
              <li><span>📱</span> Access on mobile and TV</li>
              <li><span>🏆</span> Certificate of completion</li>
              <li><span>♾️</span> Full lifetime access</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Course Content Tabs */}
      <div className="course-content">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="overview-section">
                <h3>What you'll learn</h3>
                <div className="learning-points">
                  <div className="learning-point">
                    <span className="check">✓</span>
                    <span>Master the fundamentals of {course.category?.replace('_', ' ')}</span>
                  </div>
                  <div className="learning-point">
                    <span className="check">✓</span>
                    <span>Build real-world projects from scratch</span>
                  </div>
                  <div className="learning-point">
                    <span className="check">✓</span>
                    <span>Understand best practices and patterns</span>
                  </div>
                  <div className="learning-point">
                    <span className="check">✓</span>
                    <span>Get job-ready skills for the industry</span>
                  </div>
                </div>
              </div>

              <div className="overview-section">
                <h3>Requirements</h3>
                <ul className="requirements-list">
                  <li>Basic computer skills and internet access</li>
                  <li>Willingness to learn and practice</li>
                  <li>No prior experience required for beginner courses</li>
                </ul>
              </div>

              <div className="overview-section">
                <h3>Description</h3>
                <p>{course.description}</p>
                <p>
                  This comprehensive course will take you from {course.level?.toLowerCase()} level 
                  to proficiency in {course.category?.replace('_', ' ')}. Through hands-on projects and real-world 
                  examples, you'll gain practical skills that employers are looking for.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="curriculum-tab">
              <div className="curriculum-header">
                <h3>Course Curriculum</h3>
                <p>{lessonCount} lessons • {Math.floor(totalDuration / 60)}h {totalDuration % 60}m total</p>
              </div>

              {course.lessons && course.lessons.length > 0 ? (
                <div className="lessons-list">
                  {[...course.lessons]
                    .sort((a, b) => a.order - b.order)
                    .map((lesson, index) => {
                      const completed = isLessonCompleted(lesson.id);
                      const isAccessible = !!userEnrollment;
                      
                      return (
                        <div 
                          key={lesson.id} 
                          className={`lesson-item ${completed ? 'completed' : ''} ${isAccessible ? 'accessible' : ''}`}
                          onClick={() => {
                            if (isAccessible) {
                              router.push(`/learn/${courseId}/${lesson.id}`);
                            }
                          }}
                          style={{ cursor: isAccessible ? 'pointer' : 'default' }}
                        >
                          <div className={`lesson-number ${completed ? 'completed' : ''}`}>
                            {completed ? '✓' : index + 1}
                          </div>
                          <div className="lesson-info">
                            <h4>{lesson.title}</h4>
                            {lesson.content && <p>{lesson.content.substring(0, 100)}{lesson.content.length > 100 ? '...' : ''}</p>}
                          </div>
                          <div className="lesson-meta">
                            <span className="lesson-duration">{lesson.duration} min</span>
                            {lesson.videoUrl && <span className="lesson-type">📹 Video</span>}
                            {!isAccessible && <span className="lesson-lock">🔒</span>}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <EmptyState
                  title="No lessons yet"
                  description="The instructor is working on adding content to this course."
                  icon="📚"
                />
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-tab">
              <div className="reviews-header">
                <div className="reviews-summary">
                  <div className="rating-overview">
                    <div className="rating-big">
                      <span className="rating-number">{course.averageRating?.toFixed(1) || '0.0'}</span>
                      <StarRating rating={course.averageRating || 0} size="lg" />
                      <span className="rating-count">{reviews.length} reviews</span>
                    </div>
                    
                    {/* Rating Distribution */}
                    <div className="rating-distribution">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        return (
                          <div key={rating} className="rating-bar-row">
                            <span className="rating-label">{rating} ★</span>
                            <div className="rating-bar-track">
                              <div 
                                className="rating-bar-fill" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="rating-count">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {userEnrollment && !hasReviewed && !showReviewForm && (
                  <button 
                    onClick={() => setShowReviewForm(true)}
                    className="button button-secondary"
                  >
                    ✍️ Write a Review
                  </button>
                )}

                {/* Edit/Delete buttons for existing review */}
                {userEnrollment && hasReviewed && !showReviewForm && (
                  <div className="review-actions-group">
                    <button 
                      onClick={handleEditReview}
                      className="button button-secondary"
                    >
                      ✏️ Edit Review
                    </button>
                    <button 
                      onClick={handleDeleteReview}
                      className="button button-danger"
                      disabled={deletingReview}
                    >
                      {deletingReview ? 'Deleting...' : '🗑️ Delete'}
                    </button>
                  </div>
                )}
              </div>

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="review-form">
                  <h4>{editingReview ? '✏️ Edit Your Review' : '✍️ Write Your Review'}</h4>
                  <div className="form-group">
                    <label>Your Rating</label>
                    <div className="rating-selector">
                      <StarRating 
                        rating={reviewRating} 
                        interactive 
                        onChange={setReviewRating}
                        size="lg"
                      />
                      <span className="rating-text">
                        {reviewRating === 5 && '⭐ Excellent!'}
                        {reviewRating === 4 && '👍 Very Good'}
                        {reviewRating === 3 && '👌 Good'}
                        {reviewRating === 2 && '😐 Fair'}
                        {reviewRating === 1 && '👎 Poor'}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Your Review</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience with this course... What did you learn? Was the instructor helpful? Would you recommend it to others?"
                      rows={5}
                      required
                      minLength={10}
                      maxLength={1000}
                    />
                    <div className="char-count">
                      <span className={reviewComment.length < 10 ? 'text-warning' : ''}>
                        {reviewComment.length < 10 ? `${10 - reviewComment.length} more characters needed` : `${reviewComment.length}/1000`}
                      </span>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className="button button-primary" 
                      disabled={submittingReview || reviewComment.length < 10}
                    >
                      {submittingReview ? (
                        <>⏳ {editingReview ? 'Updating...' : 'Submitting...'}</>
                      ) : (
                        <>{editingReview ? '💾 Update Review' : '📤 Submit Review'}</>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="button button-secondary"
                      onClick={handleCancelReview}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* User's own review displayed at top if exists */}
              {hasReviewed && userReview && !showReviewForm && (
                <div className="your-review-section">
                  <h4>📝 Your Review</h4>
                  <div className="review-item your-review">
                    <div className="review-header">
                      <div className="reviewer-avatar your-avatar">
                        {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="reviewer-info">
                        <h5>You</h5>
                        <StarRating rating={userReview.rating} size="sm" />
                      </div>
                      <span className="review-date">
                        {new Date(userReview.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="review-comment">{userReview.comment}</p>
                  </div>
                </div>
              )}

              {/* Other reviews */}
              {reviews.filter(r => r.userId !== user?.id && r.user?.id !== user?.id).length > 0 ? (
                <div className="other-reviews-section">
                  <h4>💬 Other Reviews ({reviews.filter(r => r.userId !== user?.id && r.user?.id !== user?.id).length})</h4>
                  <div className="reviews-list">
                    {reviews
                      .filter(r => r.userId !== user?.id && r.user?.id !== user?.id)
                      .map((review) => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-avatar">
                            {review.user?.firstName?.charAt(0).toUpperCase() || review.user?.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div className="reviewer-info">
                            <h5>{review.user?.firstName && review.user?.lastName 
                              ? `${review.user.firstName} ${review.user.lastName}`
                              : review.user?.name || 'Anonymous'}</h5>
                            <StarRating rating={review.rating} size="sm" />
                          </div>
                          <span className="review-date">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : !hasReviewed ? (
                <EmptyState
                  title="No reviews yet"
                  description={userEnrollment ? "Be the first to review this course!" : "Enroll in this course to leave a review."}
                  icon="⭐"
                />
              ) : null}
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="instructor-tab">
              {course.instructor || course.instructorUser ? (
                <div className="instructor-profile">
                  <div className="instructor-avatar-large">
                    {course.instructorUser 
                      ? (course.instructorUser.firstName?.charAt(0) || 'I').toUpperCase()
                      : typeof course.instructor === 'string' 
                        ? course.instructor.charAt(0).toUpperCase() 
                        : course.instructor?.name?.charAt(0).toUpperCase() || 'I'}
                  </div>
                  <div className="instructor-details">
                    <h3>
                      {course.instructorUser 
                        ? `${course.instructorUser.firstName} ${course.instructorUser.lastName}`
                        : typeof course.instructor === 'string' 
                          ? course.instructor 
                          : course.instructor?.name || 'Unknown Instructor'}
                    </h3>
                    <p className="instructor-title">Course Instructor</p>
                    {course.instructorUser?.email && (
                      <p className="instructor-email">{course.instructorUser.email}</p>
                    )}
                    
                    <div className="instructor-stats">
                      <div className="stat">
                        <span className="stat-value">⭐ {course.averageRating?.toFixed(1) || 'N/A'}</span>
                        <span className="stat-label">Instructor Rating</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">👥 {course.enrollmentCount || 0}</span>
                        <span className="stat-label">Students</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">📚 {lessonCount}</span>
                        <span className="stat-label">Lessons</span>
                      </div>
                    </div>

                    {course.instructorUser?.bio ? (
                      <p className="instructor-bio">{course.instructorUser.bio}</p>
                    ) : (
                      <p className="instructor-bio">
                        An experienced instructor passionate about teaching {course.category?.replace('_', ' ')}. 
                        With a focus on practical, hands-on learning, they help students 
                        build real-world skills that matter in today's job market.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <EmptyState
                  title="Instructor information unavailable"
                  description="Contact support for more information about this course."
                  icon="👤"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
