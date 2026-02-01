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
            <img src="/assets/images/logo-robo-aiq.jpeg" alt="RoboAiQ Logo" className="logo-image" />
          </div>
        </div>

        {/* Desktop Logo - Left Aligned */}
        <div className="logo logo-desktop" id="brand-logo-target">
          <img src="/assets/images/logo-robo-aiq.jpeg" alt="RoboAiQ Logo" className="logo-image" />
        </div>

        {/* Navigation - Desktop */}
        <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <a href="/#home" className={`nav-item ${activePath === '/' ? 'active' : ''}`} onClick={() => handleNavClick('/')}>
            <span className="text">Home</span>
          </a>

          <Link to="/about" className={`nav-item ${activePath === '/about' ? 'active' : ''}`} onClick={() => handleNavClick('/about')}>
            <span className="text">About</span>
          </Link>

          <Link to="/programs" className={`nav-item ${activePath === '/programs' ? 'active' : ''}`} onClick={() => handleNavClick('/programs')}>
            <span className="text">Programs</span>
          </Link>

          <Link to="/mentors" className={`nav-item ${activePath === '/mentors' ? 'active' : ''}`} onClick={() => handleNavClick('/mentors')}>
            <span className="text">Our Mentors</span>
          </Link>

          <Link to="/mentors" className={`nav-item ${activePath === '/mentors' ? 'active' : ''}`} onClick={() => handleNavClick('/mentors')}>
            <span className="text">Insights</span>
          </Link>
          
          <a href="/#contact" className="nav-item nav-cta" onClick={closeMenu}>
            <span className="text">Contact</span>
          </a>

           <a href="/#contact" className="nav-item nav-register" onClick={closeMenu}>
            <span className="text">Register</span>
          </a>
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
