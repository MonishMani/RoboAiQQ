import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo" id="brand-logo-target">
          <div className="logo-text">Robo<span>Ai</span>Q</div>
          <div className="logo-subtext">Intelligent Robotics</div>
        </div>

        {/* Navigation */}
        <div className="nav-links">
          <a href="/#home" className="nav-item">
            <span className="text">Home</span>
          </a>

          <a href="/#about" className="nav-item">
            <span className="text">About</span>
          </a>

          <Link to="/programs" className="nav-item">
            <span className="text">Programs</span>
          </Link>

          <Link to="/robotics-kit" className="nav-item">
            <span className="text">Robotics Kit</span>
          </Link>

          <Link to="/mentors" className="nav-item">
            <span className="text">Our Mentors</span>
          </Link>


          <a href="/#success-stories" className="nav-item">
            <span className="text">Success Stories</span>
          </a>

          <a href="/#student-photos" className="nav-item">
            <span className="text">Student Photos</span>
          </a>

          <a href="/#contact" className="nav-item nav-register">
            <span className="text">Register</span>
          </a>

          <a href="/#contact" className="nav-item nav-cta">
            <span className="text">Contact</span>
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
