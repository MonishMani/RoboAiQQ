import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo" id="brand-logo-target">
          <img src="/assets/images/logo-robo-aiq.jpeg" alt="RoboAiQ Logo" className="logo-image" />
        </div>

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

        {/* Navigation - Desktop */}
        <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <a href="/#home" className="nav-item" onClick={closeMenu}>
            <span className="text">Home</span>
          </a>

          <a href="/#about" className="nav-item" onClick={closeMenu}>
            <span className="text">About</span>
          </a>

          <Link to="/programs" className="nav-item" onClick={closeMenu}>
            <span className="text">Programs</span>
          </Link>

          <Link to="/robotics-kit" className="nav-item" onClick={closeMenu}>
            <span className="text">Robotics Kit</span>
          </Link>

          <Link to="/mentors" className="nav-item" onClick={closeMenu}>
            <span className="text">Our Mentors</span>
          </Link>

          <a href="/#contact" className="nav-item nav-register" onClick={closeMenu}>
            <span className="text">Register</span>
          </a>

          <a href="/#contact" className="nav-item nav-cta" onClick={closeMenu}>
            <span className="text">Contact</span>
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
