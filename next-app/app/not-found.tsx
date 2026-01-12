'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className={styles.errorCode}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          404
        </motion.h1>
        
        <h2 className={styles.title}>Page Not Found</h2>
        
        <p className={styles.description}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className={styles.illustration}>
          <svg
            width="200"
            height="150"
            viewBox="0 0 200 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M20 130 Q100 80 180 130"
              stroke="#0070f3"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.circle
              cx="100"
              cy="60"
              r="40"
              fill="#f0f7ff"
              stroke="#0070f3"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            />
            <motion.text
              x="100"
              y="68"
              textAnchor="middle"
              fill="#0070f3"
              fontSize="24"
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              ?
            </motion.text>
          </svg>
        </div>
        
        <div className={styles.actions}>
          <Link href="/" className={styles.primaryButton}>
            Go Home
          </Link>
          <Link href="/courses" className={styles.secondaryButton}>
            Browse Courses
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
