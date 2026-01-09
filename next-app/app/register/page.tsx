import Image from 'next/image';
import AuthForm from '../../components/AuthForm';

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-image-panel">
          <Image
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
            alt="Students studying"
            fill
            className="auth-bg-image"
            priority
            unoptimized
          />
          <div className="auth-image-overlay">
            <div className="auth-image-content">
              <h2>Start Learning Today</h2>
              <p>Join thousands of learners and transform your career with our expert-led courses.</p>
              <div className="auth-features">
                <div className="auth-feature">
                  <span className="auth-feature-icon">🎓</span>
                  <span>Learn at Your Own Pace</span>
                </div>
                <div className="auth-feature">
                  <span className="auth-feature-icon">🏆</span>
                  <span>Earn Recognized Certificates</span>
                </div>
                <div className="auth-feature">
                  <span className="auth-feature-icon">💼</span>
                  <span>Boost Your Career Prospects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-form-panel">
          <AuthForm mode="register" />
        </div>
      </div>
    </main>
  );
}
