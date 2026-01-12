import Link from 'next/link';

export default function CourseNotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #0070f3, #00c6ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1rem',
      }}>
        Course Not Found
      </h1>
      
      <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
        The course you're looking for doesn't exist or has been removed.
      </p>
      
      <Link
        href="/courses"
        style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #0070f3, #00c6ff)',
          color: 'white',
          borderRadius: '8px',
          fontWeight: '600',
          textDecoration: 'none',
        }}
      >
        Browse All Courses
      </Link>
    </div>
  );
}
