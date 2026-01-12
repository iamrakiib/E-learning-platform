import Image from 'next/image';
import AuthFormValidated from '@/components/AuthFormValidated';
import styles from './page.module.css';

export default function RegisterPage() {
  return (
    <main className={styles.authPage}>
      <div className={styles.container}>
        <div className={styles.imagePanel}>
          <Image
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
            alt="Students studying"
            fill
            className={styles.bgImage}
            priority
            unoptimized
          />
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <h2>Start Learning Today</h2>
              <p>Join thousands of learners and transform your career with our expert-led courses.</p>
              <div className={styles.features}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>+</span>
                  <span>Learn at Your Own Pace</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>+</span>
                  <span>Earn Recognized Certificates</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>+</span>
                  <span>Boost Your Career Prospects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formPanel}>
          <AuthFormValidated mode="register" />
        </div>
      </div>
    </main>
  );
}
