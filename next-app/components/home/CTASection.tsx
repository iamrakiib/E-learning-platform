'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.background}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            Ready to Start Your Learning Journey?
          </h2>
          <p className={styles.description}>
            Join over 50,000+ students worldwide and unlock your potential with our
            expert-led courses. Start learning today with a 7-day free trial!
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Unlimited Access</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Expert Instructors</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Certificates</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>24/7 Support</span>
            </div>
          </div>

          <div className={styles.buttons}>
            <Link href="/register" className={styles.primaryBtn}>
              Start Free Trial
              <span className={styles.arrow}>→</span>
            </Link>
            <Link href="/courses" className={styles.secondaryBtn}>
              Browse Courses
            </Link>
          </div>

          <p className={styles.note}>
            No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
