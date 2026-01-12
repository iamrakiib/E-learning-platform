import { coursesAPI } from '@/lib/api-service';
import CourseFilters from './CourseFilters';
import styles from './page.module.css';

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic';

// Server-side data fetching
async function getCourses() {
  try {
    const data = await coursesAPI.getAll();
    return data?.courses || [];
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return [];
  }
}

export default async function CoursesPage() {
  // Fetch courses using SSR
  const courses = await getCourses();

  return (
    <main className={styles.main}>
      {/* Header Section */}
      <section className={styles.header}>
        <div className={styles.headerBackground}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
        </div>
        <div className={styles.headerContent}>
          <span className={styles.eyebrow}>Course Catalog</span>
          <h1 className={styles.title}>Explore Our Courses</h1>
          <p className={styles.subtitle}>
            Discover {courses.length}+ courses designed to help you achieve your goals
          </p>
        </div>
      </section>

      {/* Filters and Courses */}
      <section className={styles.coursesSection}>
        <div className={styles.container}>
          <CourseFilters initialCourses={courses} />
        </div>
      </section>
    </main>
  );
}
