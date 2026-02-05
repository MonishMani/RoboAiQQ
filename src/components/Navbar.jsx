import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Mobile Left Section - Hamburger and Logo */}
        <div className="navbar-left-mobile">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Logo */}
          <div className="logo" id="brand-logo-target">
            <img src="/assets/logo.png" alt="RoboAiQ Logo" className="logo-image" />
          </div>
        </div>

        {/* Desktop Logo - Left Aligned */}
        <div className="logo logo-desktop" id="brand-logo-target">
          <img src="/assets/logo.png" alt="RoboAiQ Logo" className="logo-image" />
        </div>

        {/* Navigation - Desktop */}
        <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          {/* Left/Center Navigation Items */}
          <div className="nav-items-group">
            <a href="/#home" className={`nav-item ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>
              Home
            </a>

            <Link to="/about" className={`nav-item ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>
              About
            </Link>

            <Link to="/programs" className={`nav-item ${isActive('/programs') ? 'active' : ''}`} onClick={closeMenu}>
              Programs
            </Link>

            {/* Our Mentors - Temporarily Removed */}
            {/* <Link to="/mentors" className={`nav-item ${isActive('/mentors') ? 'active' : ''}`} onClick={closeMenu}>
              Our Mentors
            </Link> */}

            {/* Insights - Temporarily Removed */}
            <Link to="/insights" className={`nav-item ${isActive('/insights') ? 'active' : ''}`} onClick={closeMenu}>
              Insights
            </Link>
          </div>

          {/* Right Side - Buttons */}
          <div className="nav-buttons-group">
            <a href="/#contact" className="nav-btn nav-btn-secondary" onClick={closeMenu}>
              Contact
            </a>

            <button className="nav-btn nav-btn-primary" onClick={(e) => {
              e.preventDefault();
              closeMenu();
              const event = new CustomEvent('openBookingModal');
              document.dispatchEvent(event);
            }}>
              Register
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div className="nav-overlay" onClick={closeMenu}></div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
