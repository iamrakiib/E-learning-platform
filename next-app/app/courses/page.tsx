'use client';

import { useEffect, useState } from 'react';
import { coursesApi } from '../../lib/api';
import { Course } from '../../lib/api-types';
import SectionHeader from '../../components/SectionHeader';
import CourseCard from '../../components/CourseCard';
import { CoursesPageSkeleton } from '../../components/PageLoader';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    loadCourses();
  }, [search, category, level]);

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await coursesApi.getAll({ search, category, level });
      console.log('Courses loaded:', data);
      setCourses(data);
    } catch (err: any) {
      console.error('Failed to load courses:', err);
      setError(err.message || 'Failed to load courses. Make sure the backend is running on http://localhost:3000');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ background: 'var(--bg-section)', minHeight: 'calc(100vh - 80px)' }}>
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Course Catalog"
            title="Browse Courses"
            subtitle="Discover courses from our learning platform and start your journey"
          />

          <div className="glow-card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div>
                <label htmlFor="search">Search</label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="data-science">Data Science</option>
                </select>
              </div>
              <div>
                <label htmlFor="level">Level</label>
                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isLoading && (
        <div className="section">
          <div className="container">
            <div className="skeleton-courses-grid stagger-fade-in">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-image skeleton-pulse"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-line skeleton-pulse" style={{ width: '60%' }}></div>
                    <div className="skeleton-line skeleton-pulse" style={{ width: '90%' }}></div>
                    <div className="skeleton-line skeleton-pulse" style={{ width: '75%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="section">
          <div className="glow-card container" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <p style={{ color: '#ef4444', margin: 0 }}>{error}</p>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            {courses.length === 0 ? (
              <p style={{ color: 'var(--text-gray)', textAlign: 'center' }}>No courses found</p>
            ) : (
              <div className="grid grid-3">
                {courses.map((course) => {
                  console.log('Rendering course:', course);
                  return (
                    <CourseCard key={course.id} course={{
                      id: course.id,
                      title: course.title,
                      description: course.description,
                      category: course.category,
                      level: course.level,
                      lessonsCount: course.lessonCount || 0
                    }} />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
