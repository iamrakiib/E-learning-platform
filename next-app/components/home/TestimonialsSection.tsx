'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Developer at Google',
    initials: 'SJ',
    rating: 5,
    text: 'EduStream completely transformed my career. The courses are well-structured and the instructors are industry experts. I went from a junior developer to a senior role in just 8 months!',
    course: 'Advanced React Development',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Data Scientist at Netflix',
    initials: 'MC',
    rating: 5,
    text: 'The Machine Learning courses here are top-notch. The hands-on projects and real-world datasets helped me understand complex concepts easily. Highly recommended!',
    course: 'Machine Learning Masterclass',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX Designer at Apple',
    initials: 'ER',
    rating: 5,
    text: 'The UI/UX design course was exactly what I needed. The practical approach and feedback from instructors helped me build a portfolio that landed me my dream job.',
    course: 'UI/UX Design Fundamentals',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Full Stack Developer',
    initials: 'DK',
    rating: 5,
    text: 'I\'ve tried many online learning platforms, but EduStream stands out. The community support and project-based learning approach make a huge difference.',
    course: 'Full Stack Web Development',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.label}>Testimonials</span>
          <h2 className={styles.title}>What Our Students Say</h2>
          <p className={styles.subtitle}>
            Join thousands of satisfied learners who have transformed their careers
          </p>
        </motion.div>

        <div className={styles.testimonialWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={styles.testimonialCard}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.quote}>&ldquo;</div>
              <p className={styles.text}>{testimonials[currentIndex].text}</p>
              <div className={styles.rating}>
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>
              <div className={styles.author}>
                <span className={styles.avatar}>{testimonials[currentIndex].initials}</span>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{testimonials[currentIndex].name}</h4>
                  <p className={styles.authorRole}>{testimonials[currentIndex].role}</p>
                  <span className={styles.course}>
                    Completed: {testimonials[currentIndex].course}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.dots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.brands}>
          <p className={styles.brandsTitle}>Our students work at</p>
          <div className={styles.brandsList}>
            <span className={styles.brand}>Google</span>
            <span className={styles.brand}>Microsoft</span>
            <span className={styles.brand}>Amazon</span>
            <span className={styles.brand}>Apple</span>
            <span className={styles.brand}>Netflix</span>
            <span className={styles.brand}>Meta</span>
          </div>
        </div>
      </div>
    </section>
  );
}
