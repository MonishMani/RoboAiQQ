import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    // Set initial active path based on current location
    const path = window.location.pathname;
    setActivePath(path);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (path) => {
    setActivePath(path);
    closeMenu();
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
            <a href="/#home" className={`nav-item ${activePath === '/' ? 'active' : ''}`} onClick={() => handleNavClick('/')}>
              Home
            </a>

            <Link to="/about" className={`nav-item ${activePath === '/about' ? 'active' : ''}`} onClick={() => handleNavClick('/about')}>
              About
            </Link>

            <Link to="/programs" className={`nav-item ${activePath === '/programs' ? 'active' : ''}`} onClick={() => handleNavClick('/programs')}>
              Programs
            </Link>

            <Link to="/insights" className={`nav-item ${activePath === '/insights' ? 'active' : ''}`} onClick={() => handleNavClick('/insights')}>
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
