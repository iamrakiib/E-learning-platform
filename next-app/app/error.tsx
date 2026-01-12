'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.iconWrapper}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1 className={styles.title}>Something went wrong!</h1>
        
        <p className={styles.description}>
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>

        {error.message && (
          <div className={styles.errorMessage}>
            <code>{error.message}</code>
          </div>
        )}

        <div className={styles.actions}>
          <button onClick={reset} className={styles.primaryButton}>
            Try Again
          </button>
          <a href="/" className={styles.secondaryButton}>
            Go Home
          </a>
        </div>
      </motion.div>
    </div>
  );
}
