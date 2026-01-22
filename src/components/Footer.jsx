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
                        <a href="https://www.instagram.com/roboaiq?igsh=MWZkdHRvcHJtbHRzdw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/share/1ArDtWYteP/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
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
                        <div className="footer-contact-group">
                            <p><strong>Product Inquiries:</strong> <a href="mailto:info@roboaiq.in">info@roboaiq.in</a></p>
                            <p><strong>Commercial & Partnerships:</strong> <a href="mailto:srinivas.varanasi@roboaiq.in">srinivas.varanasi@roboaiq.in</a>, <a href="mailto:mani@roboaiq.in">mani@roboaiq.in</a></p>
                            <p><strong>Sales Team:</strong> <a href="mailto:sales@roboaiq.in">sales@roboaiq.in</a></p>
                        </div>
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
