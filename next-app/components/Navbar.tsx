'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

interface NavLink {
  href: string;
  label: string;
}

const publicLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'All Courses' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push('/');
  };

  return (
    <header className="navbar">
      <div className="container">
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-icon">🎓</span>
          <span className="navbar-logo-text">Aurora Learn</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {publicLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href as any} 
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link 
                href="/dashboard" 
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              
              {/* User dropdown */}
              <div className="user-dropdown" ref={dropdownRef}>
                <button 
                  className="user-dropdown-trigger"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="user-avatar">
                    {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                  <span className="user-name">{user.name || user.email?.split('@')[0] || 'User'}</span>
                  <span className="dropdown-arrow">▾</span>
                </button>

                {showDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <span className="dropdown-user-name">{user.name || user.email?.split('@')[0] || 'User'}</span>
                      <span className="dropdown-user-email">{user.email}</span>
                      <span className="dropdown-user-role">{user.role}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link 
                      href="/profile" 
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      👤 My Profile
                    </Link>
                    <Link 
                      href="/dashboard" 
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      📊 Dashboard
                    </Link>
                    {user.role === 'instructor' && (
                      <Link 
                        href="/instructor" 
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        📚 Instructor Dashboard
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link 
                        href={"/admin" as any}
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item dropdown-logout"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="button button-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
