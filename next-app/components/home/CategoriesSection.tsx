'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CategoriesSection.module.css';

const categories = [
  { name: 'Web Development', abbr: 'WD', count: 45, color: '#0070f3' },
  { name: 'Data Science', abbr: 'DS', count: 32, color: '#7928ca' },
  { name: 'Mobile Development', abbr: 'MD', count: 28, color: '#10b981' },
  { name: 'UI/UX Design', abbr: 'UX', count: 24, color: '#f59e0b' },
  { name: 'Cloud Computing', abbr: 'CC', count: 19, color: '#06b6d4' },
  { name: 'Machine Learning', abbr: 'ML', count: 22, color: '#ec4899' },
  { name: 'Cybersecurity', abbr: 'CS', count: 15, color: '#ef4444' },
  { name: 'DevOps', abbr: 'DO', count: 18, color: '#8b5cf6' },
];

export default function CategoriesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.label}>Browse by Category</span>
          <h2 className={styles.title}>Explore Top Categories</h2>
          <p className={styles.subtitle}>
            Choose from 200+ courses in various categories
          </p>
        </motion.div>

        <div className={styles.grid}>
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/courses?category=${encodeURIComponent(category.name)}`}
                className={styles.card}
              >
                <div
                  className={styles.iconWrapper}
                  style={{ background: `${category.color}15`, color: category.color }}
                >
                  <span className={styles.icon}>{category.abbr}</span>
                </div>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <span className={styles.count}>{category.count} Courses</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
