import Link from 'next/link';
import Image from 'next/image';

// Course category images from Unsplash
const categoryImages: Record<string, string> = {
  programming: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
  development: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
  design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
  business: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
  marketing: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
  data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
  web: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
  mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
  default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80',
};

export type Course = {
  id: number | string;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  lessonsCount?: number;
  thumbnail?: string;
  instructor?: { name?: string; firstName?: string; lastName?: string };
  price?: number;
};

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  const getCourseImage = () => {
    if (course.thumbnail) return course.thumbnail;
    const cat = course.category?.toLowerCase() || 'default';
    return categoryImages[cat] || categoryImages.default;
  };

  const instructorName = course.instructor?.name || 
    (course.instructor?.firstName && course.instructor?.lastName 
      ? `${course.instructor.firstName} ${course.instructor.lastName}` 
      : null);

  return (
    <div className="course-card">
      <div className="course-card-image-wrapper">
        <Image
          src={getCourseImage()}
          alt={course.title}
          width={400}
          height={200}
          className="course-card-img"
          unoptimized
        />
        {course.category && (
          <span className="course-card-badge">{course.category}</span>
        )}
      </div>
      <div className="course-card-content">
        <h3 className="course-card-title">{course.title}</h3>
        {course.description && (
          <p className="course-card-description">{course.description}</p>
        )}
        <div className="course-card-meta">
          {course.level && (
            <span className="course-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              {course.level}
            </span>
          )}
          {typeof course.lessonsCount === 'number' && (
            <span className="course-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              {course.lessonsCount} Lessons
            </span>
          )}
        </div>
        <div className="course-card-footer">
          {instructorName && (
            <span className="course-instructor">By {instructorName}</span>
          )}
          {course.price !== undefined && (
            <span className="course-price">
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </span>
          )}
        </div>
        <Link href={`/courses/${course.id}`} className="course-card-btn">
          View Course
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}