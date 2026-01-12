import Image from 'next/image';
import AuthFormValidated from '@/components/AuthFormValidated';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <main className={styles.authPage}>
      <div className={styles.container}>
        <div className={styles.imagePanel}>
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
            alt="Team collaboration"
            fill
            className={styles.bgImage}
            priority
            unoptimized
          />
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <h2>Welcome Back!</h2>
              <p>Continue your learning journey with thousands of courses from expert instructors.</p>
              <div className={styles.features}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Access 500+ Premium Courses</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Learn from Industry Experts</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Get Certified & Advance Your Career</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formPanel}>
          <AuthFormValidated mode="login" />
        </div>
      </div>
    </main>
  );
}
