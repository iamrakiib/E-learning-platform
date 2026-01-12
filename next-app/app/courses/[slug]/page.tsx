import { notFound } from 'next/navigation';
import { coursesAPI } from '@/lib/api-service';
import CourseDetail from './CourseDetail';

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Server-side data fetching
async function getCourse(id: number) {
  try {
    const data = await coursesAPI.getById(id);
    return data || null;
  } catch (error) {
    console.error('Failed to fetch course:', error);
    return null;
  }
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const courseId = parseInt(slug);

  if (isNaN(courseId)) {
    notFound();
  }

  // Fetch course using SSR
  const course = await getCourse(courseId);

  if (!course) {
    notFound();
  }

  // Pass SSR data to client component for interactivity
  return <CourseDetail initialCourse={course} courseId={courseId} />;
}
