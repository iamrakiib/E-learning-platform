'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './StatsSection.module.css';

export interface StatsSectionProps {
  totalCourses?: number;
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection({ totalCourses = 200 }: StatsSectionProps) {
  const stats = [
    { label: 'Active Students', value: 50000, suffix: '+', iconType: 'students' },
    { label: 'Expert Courses', value: totalCourses, suffix: '+', iconType: 'courses' },
    { label: 'Expert Instructors', value: 150, suffix: '+', iconType: 'instructors' },
    { label: 'Hours of Content', value: 5000, suffix: '+', iconType: 'hours' },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'students':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
        );
      case 'courses':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        );
      case 'instructors':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        );
      case 'hours':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={styles.statCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span className={styles.icon}>{getIcon(stat.iconType)}</span>
            <div className={styles.number}>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </div>
            <div className={styles.label}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
