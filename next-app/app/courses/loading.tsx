'use client';

import { motion } from 'framer-motion';
import styles from './loading.module.css';

export default function CoursesLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.filterSkeleton}></div>
      </div>
      
      <div className={styles.grid}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className={styles.cardSkeleton}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={styles.imageSkeleton}></div>
            <div className={styles.contentSkeleton}>
              <div className={styles.lineSkeleton} style={{ width: '80%' }}></div>
              <div className={styles.lineSkeleton} style={{ width: '60%' }}></div>
              <div className={styles.lineSkeleton} style={{ width: '40%' }}></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
