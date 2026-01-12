'use client';

import { motion } from 'framer-motion';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <motion.div
        className={styles.loader}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className={styles.innerCircle}></div>
      </motion.div>
      <motion.p
        className={styles.loadingText}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
