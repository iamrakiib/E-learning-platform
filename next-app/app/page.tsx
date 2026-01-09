import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '../components/SectionHeader';
import TestimonialCard from '../components/TestimonialCard';

const testimonials = [
  {
    quote: "This platform transformed my career. The courses are top-notch and the instructors are industry experts. I can't recommend it enough!",
    author: {
      name: 'Sarah L.',
      title: 'Software Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    },
  },
  {
    quote: "I was able to learn a new skill in just a few weeks. The flexible learning schedule made it possible to balance my job and my studies.",
    author: {
      name: 'Michael B.',
      title: 'UX Designer',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    },
  },
  {
    quote: "The community and support are amazing. I've connected with so many talented people and expanded my professional network.",
    author: {
      name: 'Jessica P.',
      title: 'Data Scientist',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    },
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-eyebrow">WELCOME TO COURSEHUB</span>
            <h1>Best Online Education Expertise</h1>
            <p>
              Discover quality education from expert instructors worldwide. Start your learning journey today and achieve your goals.
            </p>
            <div className="badge-row">
              <Link className="button" href="/register">
                Get Started Now
              </Link>
              <Link className="button secondary" href="/courses">
                View Courses
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">
              <div className="hero-card hero-card-1">
                <div className="hero-card-icon">📚</div>
                <span>500+ Courses</span>
              </div>
              <div className="hero-card hero-card-2">
                <div className="hero-card-icon">👨‍🎓</div>
                <span>25K+ Students</span>
              </div>
              <div className="hero-card hero-card-3">
                <div className="hero-card-icon">🏆</div>
                <span>Expert Tutors</span>
              </div>
              <div className="hero-main-visual">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80"
                  alt="Students learning together"
                  width={500}
                  height={420}
                  className="hero-main-image"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <SectionHeader
            eyebrow="LEARN ANYTHING"
            title={"Benefits About Online\nLearning Expertise"}
            subtitle="Explore our comprehensive online courses and start your learning journey today"
            center
          />
          
          <div className="grid grid-3" style={{ marginTop: '3rem' }}>
            <div className="glow-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                Online Courses
              </h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
                Access a wide range of courses from the comfort of your home.
              </p>
            </div>

            <div className="glow-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                Earn A Certificate
              </h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
                Get certified upon completion and boost your professional profile.
              </p>
            </div>

            <div className="glow-card">
              <div className="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                Learn with Experts
              </h3>
              <p style={{ color: 'var(--text-gray)', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
                Learn from industry experts with years of experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="SUCCESS METRICS"
            title="Join Thousands of Successful Learners"
            subtitle="Our platform has helped students achieve their learning goals worldwide."
            center
          />
          <div className="stats-grid" style={{ marginTop: '3rem' }}>
            <div className="stat-card">
              <div className="stat-number">25K+</div>
              <div className="stat-label">Active Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Expert Instructors</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1K+</div>
              <div className="stat-label">Premium Courses</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <SectionHeader
            eyebrow="TESTIMONIALS"
            title="What Our Students Say"
            subtitle="Hear from our students about their learning experience."
            center
          />
          <div className="grid grid-3" style={{ marginTop: '3rem' }}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <SectionHeader
            eyebrow="GET STARTED TODAY"
            title="Ready to Transform Your Career?"
            subtitle="Join our community of learners and start your journey to success today."
            center
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/courses" className="button" style={{ padding: '1rem 2.5rem' }}>
              Browse All Courses
            </Link>
            <Link href="/register" className="button secondary" style={{ padding: '1rem 2.5rem' }}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
