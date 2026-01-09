'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { coursesApi, enrollmentsApi } from '../../../../lib/api';
import { Course, Lesson, LessonProgress } from '../../../../lib/api-types';
import { useAuth } from '../../../../contexts/AuthContext';
import { LoadingSpinner, ErrorMessage, ProgressBar } from '../../../../components/ui';

type LearnPageProps = {
  params: { courseId: string; lessonId: string };
};

export default function LearnPage({ params }: LearnPageProps) {
  const courseId = parseInt(params.courseId);
  const lessonId = parseInt(params.lessonId);
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [completing, setCompleting] = useState(false);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (!isNaN(courseId) && !isNaN(lessonId)) {
      loadData();
    }
  }, [courseId, lessonId, user]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [courseData, progressData] = await Promise.all([
        coursesApi.getById(courseId),
        enrollmentsApi.getProgress(courseId)
      ]);
      setCourse(courseData);
      setProgress(progressData || []);
      
      const lesson = courseData.lessons?.find((l: Lesson) => l.id === lessonId);
      if (lesson) {
        setCurrentLesson(lesson);
      } else {
        setError('Lesson not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load lesson');
    } finally {
      setIsLoading(false);
    }
  };

  const markComplete = async () => {
    if (!currentLesson) return;
    
    try {
      setCompleting(true);
      await enrollmentsApi.markLessonComplete(courseId, lessonId);
      
      // Update local progress
      setProgress(prev => {
        const existing = prev.find(p => p.lessonId === lessonId);
        if (existing) {
          return prev.map(p => p.lessonId === lessonId ? { ...p, completed: true } : p);
        }
        return [...prev, { lessonId, completed: true, watchedDuration: currentLesson.duration } as LessonProgress];
      });
      
      // Go to next lesson if available
      if (course?.lessons) {
        const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
        if (currentIndex < course.lessons.length - 1) {
          const nextLesson = course.lessons[currentIndex + 1];
          router.push(`/learn/${courseId}/${nextLesson.id}`);
        }
      }
    } catch (err: any) {
      alert(err.message || 'Failed to mark lesson complete');
    } finally {
      setCompleting(false);
    }
  };

  const goToLesson = (lesson: Lesson) => {
    router.push(`/learn/${courseId}/${lesson.id}`);
  };

  const goToPrevious = () => {
    if (course?.lessons) {
      const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
      if (currentIndex > 0) {
        const prevLesson = course.lessons[currentIndex - 1];
        router.push(`/learn/${courseId}/${prevLesson.id}`);
      }
    }
  };

  const goToNext = () => {
    if (course?.lessons) {
      const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
      if (currentIndex < course.lessons.length - 1) {
        const nextLesson = course.lessons[currentIndex + 1];
        router.push(`/learn/${courseId}/${nextLesson.id}`);
      }
    }
  };

  const isLessonComplete = (lessonId: number) => {
    return progress.some(p => p.lessonId === lessonId && p.completed);
  };

  const calculateProgress = () => {
    if (!course?.lessons || course.lessons.length === 0) return 0;
    const completed = progress.filter(p => p.completed).length;
    return Math.round((completed / course.lessons.length) * 100);
  };

  if (isLoading) {
    return (
      <div className="learning-page">
        <div className="video-section">
          <div className="video-container">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !course || !currentLesson) {
    return (
      <div className="learning-page">
        <div className="video-section">
          <ErrorMessage 
            message={error || 'Content not found'} 
            onRetry={loadData}
          />
        </div>
      </div>
    );
  }

  const currentIndex = course.lessons?.findIndex(l => l.id === lessonId) ?? 0;
  const hasPrevious = currentIndex > 0;
  const hasNext = course.lessons && currentIndex < course.lessons.length - 1;
  const isComplete = isLessonComplete(lessonId);

  return (
    <div className="learning-page">
      {/* Video Section */}
      <div className="video-section">
        <div className="video-container">
          {currentLesson.videoUrl ? (
            <video
              src={currentLesson.videoUrl}
              controls
              autoPlay
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="video-placeholder">
              <div className="icon">🎬</div>
              <h3>Video Content</h3>
              <p>Video will be available soon</p>
            </div>
          )}
        </div>

        <div className="lesson-content">
          <h1>{currentLesson.title}</h1>
          
          <div className="lesson-meta-bar">
            <span>📚 Lesson {currentIndex + 1} of {course.lessons?.length}</span>
            <span>⏱️ {currentLesson.duration} minutes</span>
            {isComplete && <span style={{ color: '#10b981' }}>✓ Completed</span>}
          </div>

          {currentLesson.description && (
            <div className="lesson-description">
              <p>{currentLesson.description}</p>
            </div>
          )}

          {currentLesson.content && (
            <div className="lesson-description" style={{ marginTop: '1rem' }}>
              <p>{currentLesson.content}</p>
            </div>
          )}

          <div className="lesson-actions">
            <button 
              onClick={goToPrevious}
              className="button button-secondary"
              disabled={!hasPrevious}
            >
              ← Previous
            </button>

            {!isComplete ? (
              <button 
                onClick={markComplete}
                className="button button-primary"
                disabled={completing}
              >
                {completing ? 'Marking...' : 'Mark as Complete'}
              </button>
            ) : (
              <span className="button button-secondary" style={{ cursor: 'default' }}>
                ✓ Completed
              </span>
            )}

            <button 
              onClick={goToNext}
              className="button button-secondary"
              disabled={!hasNext}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lessons-sidebar">
        <div className="sidebar-header">
          <h3>{course.title}</h3>
          <div className="progress-info">
            <span>{calculateProgress()}% complete</span>
            <span>{progress.filter(p => p.completed).length}/{course.lessons?.length} lessons</span>
          </div>
          <ProgressBar progress={calculateProgress()} />
        </div>

        <div className="sidebar-lessons">
          {course.lessons?.map((lesson, index) => {
            const complete = isLessonComplete(lesson.id);
            const isCurrent = lesson.id === lessonId;
            
            return (
              <div
                key={lesson.id}
                className={`sidebar-lesson ${isCurrent ? 'active' : ''}`}
                onClick={() => goToLesson(lesson)}
              >
                <div className={`lesson-status ${complete ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                  {complete ? '✓' : index + 1}
                </div>
                <div className="sidebar-lesson-info">
                  <div className="sidebar-lesson-title">{lesson.title}</div>
                  <div className="sidebar-lesson-duration">{lesson.duration} min</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ padding: '1rem' }}>
          <Link href={`/courses/${courseId}`} className="button button-secondary" style={{ width: '100%', textAlign: 'center' }}>
            ← Back to Course
          </Link>
        </div>
      </div>
    </div>
  );
}
