'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './CourseFilters.module.css';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  price?: number;
  instructor?: any; // Flexible type for instructor object
  lessonCount?: number;
  enrollmentCount?: number;
  slug?: string;
}

interface CourseFiltersProps {
  initialCourses: Course[];
}

export default function CourseFilters({ initialCourses }: CourseFiltersProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(initialCourses);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Update courses when initialCourses changes
  useEffect(() => {
    setCourses(initialCourses);
    setFilteredCourses(initialCourses);
  }, [initialCourses]);

  // Client-side filtering
  useEffect(() => {
    let result = [...courses];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (category) {
      result = result.filter((course) =>
        course.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Level filter
    if (level) {
      result = result.filter((course) =>
        course.level?.toLowerCase() === level.toLowerCase()
      );
    }

    // Sorting
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0));
        break;
      case 'price-low':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'newest':
      default:
        // Already sorted by newest from backend
        break;
    }

    setFilteredCourses(result);
  }, [courses, search, category, level, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setLevel('');
    setSortBy('newest');
  };

  const hasActiveFilters = search || category || level || sortBy !== 'newest';

  return (
    <>
      {/* Filters Section */}
      <div className={styles.filtersCard}>
        <div className={styles.filtersGrid}>
          <div className={styles.filterGroup}>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              <option value="">All Categories</option>
              <option value="programming">Programming</option>
              <option value="web development">Web Development</option>
              <option value="data science">Data Science</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="level">Level</label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={styles.select}
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="sortBy">↕️ Sort By</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className={styles.filterActions}>
            <button onClick={clearFilters} className={styles.clearBtn}>
              ✕ Clear Filters
            </button>
            <span className={styles.resultCount}>
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
            </span>
          </div>
        )}
      </div>

      {/* Courses Grid */}
      <div className={styles.coursesGrid}>
        <AnimatePresence mode="popLayout">
          {filteredCourses.length === 0 ? (
            <motion.div
              className={styles.noCourses}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className={styles.noCoursesIcon}>CRS</span>
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className={styles.resetBtn}>
                Reset Filters
              </button>
            </motion.div>
          ) : (
            filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/courses/${course.id}`} className={styles.courseCard}>
                  <div className={styles.courseImage}>
                    <div className={styles.coursePlaceholder}>
                      {course.category === 'programming' && 'PRG'}
                      {course.category === 'web development' && 'WEB'}
                      {course.category === 'data science' && 'DS'}
                      {course.category === 'design' && 'DES'}
                      {course.category === 'business' && 'BUS'}
                      {course.category === 'marketing' && 'MKT'}
                      {!['programming', 'web development', 'data science', 'design', 'business', 'marketing'].includes(course.category?.toLowerCase() || '') && 'CRS'}
                    </div>
                    <div className={styles.levelBadge}>{course.level || 'All Levels'}</div>
                  </div>
                  <div className={styles.courseContent}>
                    <span className={styles.categoryTag}>{course.category}</span>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.courseDescription}>
                      {course.description?.substring(0, 100)}
                      {course.description?.length > 100 ? '...' : ''}
                    </p>
                    <div className={styles.courseMeta}>
                      <span className={styles.lessons}>
                        {course.lessonCount || 0} lessons
                      </span>
                      <span className={styles.students}>
                        {course.enrollmentCount || 0} students
                      </span>
                    </div>
                    <div className={styles.courseFooter}>
                      <span className={styles.instructor}>
                        by {course.instructor?.firstName 
                          ? `${course.instructor.firstName} ${course.instructor.lastName || ''}`.trim()
                          : course.instructor?.name || 'Unknown Instructor'}
                      </span>
                      <span className={styles.price}>
                        {course.price ? `$${course.price}` : 'Free'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
