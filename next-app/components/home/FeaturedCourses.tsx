'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Course } from '@/lib/api-service';
import styles from './FeaturedCourses.module.css';

export interface FeaturedCoursesProps {
  courses: Course[];
}

export default function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  const displayCourses = courses || [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>Top Courses</span>
          <h2 className={styles.title}>Featured Courses</h2>
          <p className={styles.subtitle}>
            Explore our most popular courses and start learning today
          </p>
        </motion.div>

        <div className={styles.grid}>
          {displayCourses.slice(0, 6).map((course, index) => (
            <motion.div
              key={course.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={course.thumbnail || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                  alt={course.title}
                  className={styles.image}
                />
                <div className={styles.badge}>
                  {course.level}
                </div>
                {course.price === 0 && (
                  <div className={styles.freeBadge}>Free</div>
                )}
              </div>

              <div className={styles.content}>
                <div className={styles.category}>{course.category || 'Development'}</div>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.description}>
                  {course.shortDescription || course.description?.slice(0, 100)}...
                </p>

                <div className={styles.meta}>
                  <div className={styles.rating}>
                    <span className={styles.stars}>
                      {'★'.repeat(Math.round(Number(course.averageRating) || 4))}
                      {'☆'.repeat(5 - Math.round(Number(course.averageRating) || 4))}
                    </span>
                    <span className={styles.ratingText}>
                      {Number(course.averageRating || 4).toFixed(1)}
                    </span>
                  </div>
                  <span className={styles.students}>
                    {course.enrollmentCount || 0} students
                  </span>
                </div>

                <div className={styles.footer}>
                  <span className={styles.price}>
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </span>
                  <Link href={`/courses/${course.slug || course.id}`} className={styles.viewButton}>
                    View Course →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/courses" className={styles.viewAllButton}>
            View All Courses
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
