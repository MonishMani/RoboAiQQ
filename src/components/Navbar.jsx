import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo" id="brand-logo-target">
          <img src="/assets/logo_robo_aiq.jpeg" alt="RoboAiQ Logo" className="logo-image" />
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
