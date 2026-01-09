'use client';

interface PageLoaderProps {
  text?: string;
}

export function PageLoader({ text = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="page-loader">
      <div className="page-loader-content">
        <div className="loader-animation">
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
        </div>
        <p className="loader-text">{text}</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image skeleton-pulse"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-pulse" style={{ width: '60%' }}></div>
        <div className="skeleton-line skeleton-pulse" style={{ width: '90%' }}></div>
        <div className="skeleton-line skeleton-pulse" style={{ width: '75%' }}></div>
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="skeleton-stats-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="skeleton-stat-card">
          <div className="skeleton-stat-icon skeleton-pulse"></div>
          <div className="skeleton-stat-content">
            <div className="skeleton-line skeleton-pulse" style={{ width: '50%', height: '24px' }}></div>
            <div className="skeleton-line skeleton-pulse" style={{ width: '70%', height: '14px' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="skeleton-table">
      <div className="skeleton-table-header skeleton-pulse"></div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="skeleton-table-row">
          <div className="skeleton-cell skeleton-pulse" style={{ width: '20%' }}></div>
          <div className="skeleton-cell skeleton-pulse" style={{ width: '30%' }}></div>
          <div className="skeleton-cell skeleton-pulse" style={{ width: '15%' }}></div>
          <div className="skeleton-cell skeleton-pulse" style={{ width: '20%' }}></div>
          <div className="skeleton-cell skeleton-pulse" style={{ width: '15%' }}></div>
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton animate-fade-in">
      {/* Hero Skeleton */}
      <div className="skeleton-hero">
        <div className="skeleton-hero-content">
          <div className="skeleton-avatar skeleton-pulse"></div>
          <div className="skeleton-hero-text">
            <div className="skeleton-line skeleton-pulse" style={{ width: '120px', height: '16px' }}></div>
            <div className="skeleton-line skeleton-pulse" style={{ width: '250px', height: '32px' }}></div>
            <div className="skeleton-line skeleton-pulse" style={{ width: '180px', height: '14px' }}></div>
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <SkeletonStats />

      {/* Content Skeleton */}
      <div className="skeleton-section">
        <div className="skeleton-section-header">
          <div className="skeleton-line skeleton-pulse" style={{ width: '200px', height: '24px' }}></div>
        </div>
        <div className="skeleton-cards-grid">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CoursesPageSkeleton() {
  return (
    <div className="courses-skeleton animate-fade-in">
      <div className="skeleton-page-header">
        <div className="skeleton-line skeleton-pulse" style={{ width: '300px', height: '36px' }}></div>
        <div className="skeleton-line skeleton-pulse" style={{ width: '200px', height: '20px', marginTop: '12px' }}></div>
      </div>
      
      <div className="skeleton-filters">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-filter skeleton-pulse"></div>
        ))}
      </div>

      <div className="skeleton-courses-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="profile-skeleton animate-fade-in">
      <div className="skeleton-profile-hero">
        <div className="skeleton-profile-avatar skeleton-pulse"></div>
        <div className="skeleton-profile-info">
          <div className="skeleton-line skeleton-pulse" style={{ width: '100px', height: '20px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '200px', height: '32px' }}></div>
          <div className="skeleton-line skeleton-pulse" style={{ width: '180px', height: '16px' }}></div>
        </div>
      </div>
      
      <div className="skeleton-profile-stats">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-profile-stat skeleton-pulse"></div>
        ))}
      </div>

      <div className="skeleton-tabs">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-tab skeleton-pulse"></div>
        ))}
      </div>

      <SkeletonStats />
    </div>
  );
}
