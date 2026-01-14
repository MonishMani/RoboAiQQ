import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section footer-brand">
                    <h3>ROBOAIQ</h3>
                    <p>Pioneering the next era of autonomous intelligence. Our hardware doesn't just work; it thinks, adapts, and evolves alongside your ambition.</p>
                    <div className="social-icons">
                        <a href="#" aria-label="Twitter">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                            </svg>
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                        <a href="#" aria-label="GitHub">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Email">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="M2 6l10 7.5L22 6" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="footer-section footer-navigation">
                    <h4>NAVIGATION</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#products">Programe</a></li>
                        <li><a href="#ai-advisor">Module</a></li>
                        <li><a href="#privacy">Sucess Stories</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-section footer-headquarters">
                    <h4>Contact Info</h4>
                    <div className="footer-info">
                        <p>ROBOAIQ </p>
                        <p>Phone: 8971252285</p>
                        <p>Email: Sales@werrcm.com</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 ROBOAIQ TECHNOLOGIES INC. ALL RIGHTS RESERVED.</p>
                <div className="footer-links">
                    <a href="#terms">TERMS OF SERVICE</a>
                    <a href="#cookies">COOKIE POLICY</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
