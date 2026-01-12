'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePusher } from '@/hooks/usePusher';
import { useAuth } from '@/contexts/AuthContext';
import styles from './NotificationBell.module.css';

export default function NotificationBell() {
  const { user } = useAuth();
  const { notifications, removeNotification, clearNotifications, isConnected } = usePusher({
    userId: user?.id,
    enabled: !!user,
  });
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.length;

  return (
    <div className={styles.container}>
      <button
        className={styles.bellButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        
        {unreadCount > 0 && (
          <motion.span
            className={styles.badge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
        
        {isConnected && <span className={styles.connectedDot} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className={styles.dropdown}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className={styles.header}>
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className={styles.clearBtn}
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className={styles.list}>
                {notifications.length === 0 ? (
                  <div className={styles.empty}>
                    <span className={styles.emptyIcon}>BELL</span>
                    <p>No new notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      className={styles.item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      layout
                    >
                      <div className={styles.itemIcon}>
                        {notification.type === 'new-enrollment' && 'NEW'}
                        {notification.type === 'new-lesson' && 'LES'}
                        {notification.type === 'new-review' && 'REV'}
                        {notification.type === 'course-updated' && 'UPD'}
                        {!['new-enrollment', 'new-lesson', 'new-review', 'course-updated'].includes(notification.type) && 'MSG'}
                      </div>
                      <div className={styles.itemContent}>
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span className={styles.time}>
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                      <button
                        className={styles.dismissBtn}
                        onClick={() => removeNotification(notification.id)}
                        aria-label="Dismiss"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
