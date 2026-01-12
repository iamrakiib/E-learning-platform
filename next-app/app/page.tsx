import {
  HeroSection,
  FeaturedCourses,
  StatsSection,
  CategoriesSection,
  TestimonialsSection,
  CTASection,
} from '@/components/home';
import { coursesAPI } from '@/lib/api-service';

// Force dynamic rendering for SSR data fetching demonstration
export const dynamic = 'force-dynamic';

// Server-side data fetching for courses
async function getPopularCourses() {
  try {
    const data = await coursesAPI.getPopular();
    return data || [];
  } catch (error) {
    console.error('Failed to fetch popular courses:', error);
    return [];
  }
}

export default async function HomePage() {
  // Fetch popular courses using SSR
  const courses = await getPopularCourses();

  return (
    <main>
      <HeroSection />
      <FeaturedCourses courses={courses} />
      <StatsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
