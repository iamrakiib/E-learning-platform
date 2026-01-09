'use client';

import { useState } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizes = { sm: '20px', md: '40px', lg: '60px' };
  
  return (
    <div className="loading-container">
      <div 
        className="loading-spinner" 
        style={{ width: sizes[size], height: sizes[size] }}
      />
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="button secondary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: React.ReactNode | { label: string; onClick: () => void };
}

export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action && (
        typeof action === 'object' && 'label' in action ? (
          <button className="button" onClick={action.onClick}>
            {action.label}
          </button>
        ) : action
      )}
    </div>
  );
}

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function ProgressBar({ progress, showLabel = true, size = 'md' }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={`progress-bar-container ${size}`}>
      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <span className="progress-bar-label">{Math.round(clampedProgress)}%</span>
      )}
    </div>
  );
}

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md', 
  interactive = false,
  onChange 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = interactive ? (hoverRating || rating) : rating;
  
  const sizeClasses = { sm: 'small', md: 'medium', lg: 'large' };
  
  return (
    <div 
      className={`star-rating ${sizeClasses[size]} ${interactive ? 'interactive' : ''}`}
      onMouseLeave={() => interactive && setHoverRating(0)}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= displayRating;
        const halfFilled = !filled && starValue - 0.5 <= displayRating;
        
        return (
          <span
            key={index}
            className={`star ${filled ? 'filled' : ''} ${halfFilled ? 'half' : ''}`}
            onClick={() => interactive && onChange?.(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
          >
            {filled || halfFilled ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

interface TabsProps {
  tabs: { id: string; label: string; icon?: string }[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon && <span className="tab-icon">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  };

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
}
