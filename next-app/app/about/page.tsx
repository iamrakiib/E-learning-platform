import Image from 'next/image';

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--bg-section)', minHeight: 'calc(100vh - 80px)' }}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-text">
            <div className="section-eyebrow">ABOUT US</div>
            <h1 className="section-title">Empowering Learners Worldwide</h1>
            <p style={{ color: 'var(--text-gray)', maxWidth: '600px', lineHeight: 1.8, fontSize: '1.1rem' }}>
              CourseHub is a comprehensive online learning platform that connects students with expert 
              instructors from around the world. Our mission is to make quality education accessible to 
              everyone, anywhere, at any time.
            </p>
          </div>
          <div className="about-hero-image">
            <Image
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80"
              alt="Students in classroom"
              width={550}
              height={450}
              className="about-image"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-3">
            <div className="about-value-card">
              <div className="about-value-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>Empower learners worldwide with accessible, high-quality education that transforms lives and careers.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">💡</div>
              <h3>Our Vision</h3>
              <p>Create a global community of lifelong learners and expert educators connected through knowledge.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">✨</div>
              <h3>Our Values</h3>
              <p>Excellence, accessibility, innovation, and unwavering commitment to student success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-eyebrow">OUR TEAM</div>
          <h2 className="section-title" style={{ marginBottom: '3rem' }}>Meet Our Leadership</h2>
          <div className="about-team-grid">
            <div className="about-team-card">
              <div className="about-team-image">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                  alt="CEO"
                  width={200}
                  height={200}
                  unoptimized
                />
              </div>
              <h4>Robert Chen</h4>
              <p>Founder & CEO</p>
            </div>
            <div className="about-team-card">
              <div className="about-team-image">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                  alt="CTO"
                  width={200}
                  height={200}
                  unoptimized
                />
              </div>
              <h4>Sarah Johnson</h4>
              <p>Chief Technology Officer</p>
            </div>
            <div className="about-team-card">
              <div className="about-team-image">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                  alt="Head of Education"
                  width={200}
                  height={200}
                  unoptimized
                />
              </div>
              <h4>Michael Davis</h4>
              <p>Head of Education</p>
            </div>
            <div className="about-team-card">
              <div className="about-team-image">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                  alt="Head of Design"
                  width={200}
                  height={200}
                  unoptimized
                />
              </div>
              <h4>Emily Parker</h4>
              <p>Head of Design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section about-stats-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="about-stats-grid">
            <div className="about-stat">
              <span className="about-stat-number">25K+</span>
              <span className="about-stat-label">Active Students</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">500+</span>
              <span className="about-stat-label">Expert Instructors</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">1K+</span>
              <span className="about-stat-label">Quality Courses</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">150+</span>
              <span className="about-stat-label">Countries Reached</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
