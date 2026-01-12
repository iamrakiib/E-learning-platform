'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Top Section with Logo and Newsletter */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100&h=100&fit=crop&auto=format"
                alt="CourseHub Logo"
                width={45}
                height={45}
                className="footer-logo-img"
                unoptimized
              />
              <span className="footer-logo-text">CourseHub</span>
            </div>
            <p className="footer-tagline">Empowering learners worldwide with quality education</p>
          </div>
          <div className="footer-newsletter">
            <h4>Subscribe to our Newsletter</h4>
            <p>Get the latest courses and updates directly in your inbox</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-grid">
          <div className="footer-column">
            <h4>About CourseHub</h4>
            <p>Your one-stop destination for quality online education. Learn from industry experts and achieve your career goals with our comprehensive courses.</p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{display: 'block'}}>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{display: 'block'}}>
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{display: 'block'}}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{display: 'block'}}>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/courses">Browse Courses</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/dashboard">My Dashboard</Link></li>
              <li><Link href="/profile">My Profile</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Categories</h4>
            <ul>
              <li><Link href="/courses?category=programming">Programming</Link></li>
              <li><Link href="/courses?category=web-development">Web Development</Link></li>
              <li><Link href="/courses?category=design">UI/UX Design</Link></li>
              <li><Link href="/courses?category=business">Business</Link></li>
              <li><Link href="/courses?category=data-science">Data Science</Link></li>
              <li><Link href="/courses?category=marketing">Digital Marketing</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>contact@coursehub.com</span>
              </div>
              <div className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>123 Learning Street, Education City</span>
              </div>
            </div>
            <div className="footer-certifications">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=120&h=40&fit=crop&auto=format"
                alt="Certified Education Platform"
                width={100}
                height={35}
                className="cert-badge"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {new Date().getFullYear()} CourseHub. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
