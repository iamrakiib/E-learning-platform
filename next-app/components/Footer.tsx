import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>About CourseHub</h4>
            <p>Your one-stop destination for quality online education. Learn from experts and achieve your goals.</p>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Categories</h4>
            <ul>
              <li><Link href="/courses?category=programming">Programming</Link></li>
              <li><Link href="/courses?category=design">Design</Link></li>
              <li><Link href="/courses?category=business">Business</Link></li>
              <li><Link href="/courses?category=data-science">Data Science</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Us</h4>
            <p>Email: contact@coursehub.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CourseHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
