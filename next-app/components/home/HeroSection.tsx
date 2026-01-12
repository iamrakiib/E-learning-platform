'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.particles}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.particle}
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-20, -100],
                x: Math.random() * 40 - 20,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
                        #1 Online Learning Platform
          </motion.span>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Learn Without Limits
            <span className={styles.highlight}> With AI-Powered</span> Education
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Unlock your potential with courses from world-class instructors. 
            Get personalized learning assistance with our AI chatbot and 
            track your progress in real-time.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/courses" className={styles.primaryButton}>
              <span>Explore Courses</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="/register" className={styles.secondaryButton}>
              Start Free Trial
            </Link>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.stat}>
              <span className={styles.statNumber}>50K+</span>
              <span className={styles.statLabel}>Active Students</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>200+</span>
              <span className={styles.statLabel}>Expert Courses</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4.9</span>
              <span className={styles.statLabel}>Average Rating</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Students learning online"
              className={styles.heroImage}
            />
            <div className={styles.floatingCard1}>
              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div className={styles.cardText}>
                <span className={styles.cardTitle}>New Course</span>
                <span className={styles.cardDesc}>React & Next.js</span>
              </div>
            </div>
            <div className={styles.floatingCard2}>
              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </div>
              <div className={styles.cardText}>
                <span className={styles.cardTitle}>AI Assistant</span>
                <span className={styles.cardDesc}>24/7 Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
