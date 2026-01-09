import Image from 'next/image';
import AuthForm from '../../components/AuthForm';

export default function LoginPage() {
  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-image-panel">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
            alt="Team collaboration"
            fill
            className="auth-bg-image"
            priority
            unoptimized
          />
          <div className="auth-image-overlay">
            <div className="auth-image-content">
              <h2>Welcome Back!</h2>
              <p>Continue your learning journey with thousands of courses from expert instructors.</p>
              <div className="auth-features">
                <div className="auth-feature">
                  <span className="auth-feature-icon">✓</span>
                  <span>Access 500+ Premium Courses</span>
                </div>
                <div className="auth-feature">
                  <span className="auth-feature-icon">✓</span>
                  <span>Learn from Industry Experts</span>
                </div>
                <div className="auth-feature">
                  <span className="auth-feature-icon">✓</span>
                  <span>Get Certified & Advance Your Career</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-form-panel">
          <AuthForm mode="login" />
        </div>
      </div>
    </main>
  );
}
