import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ProtectedEmail, ROBOAIQ_EMAILS } from '../utils/emailProtection';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-page">
            <Navbar />

            <div className="privacy-container">
                <header className="privacy-header">
                    <h1 className="privacy-title">Privacy Policy</h1>
                    <div className="privacy-meta">
                        <p>Effective Date: 28.1.2026 | Last Updated: 28.1.2026</p>
                    </div>
                    <p className="privacy-intro">
                        At RoboAIQ, we are committed to protecting the privacy and personal information of our students, parents, schools, and website visitors. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our website, programs, and services.
                    </p>
                </header>

                <div className="privacy-content">
                    <section className="policy-section">
                        <h2>1. Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <h3>a) Personal Information</h3>
                        <ul>
                            <li>Parent/Guardian name</li>
                            <li>Student name and age</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>School name</li>
                            <li>Location (city/state)</li>
                        </ul>
                        <h3>b) Technical Information</h3>
                        <ul>
                            <li>IP address</li>
                            <li>Browser type</li>
                            <li>Device information</li>
                            <li>Pages visited and interaction data</li>
                        </ul>
                        <p>This information is collected through enquiry forms, registrations, demo bookings, website visits, and program enrollments.</p>
                    </section>

                    <section className="policy-section">
                        <h2>2. How We Use Your Information</h2>
                        <p>We use the collected information to:</p>
                        <ul>
                            <li>Provide details about RoboAIQ programs and services</li>
                            <li>Process enrollments and admissions</li>
                            <li>Communicate updates, schedules, and important announcements</li>
                            <li>Improve our website, curriculum, and user experience</li>
                            <li>Respond to queries and support requests</li>
                            <li>Conduct internal analysis and reporting</li>
                        </ul>
                        <p><strong><span className="policy-highlight">We do not sell, rent, or trade personal information to third parties.</span></strong></p>
                    </section>

                    <section className="policy-section">
                        <h2>3. Data Protection & Security</h2>
                        <p>
                            RoboAIQ implements industry-standard security measures to safeguard personal information against unauthorized access, misuse, alteration, or disclosure. Access to sensitive data is limited only to authorized personnel.
                        </p>
                        <p>
                            While we strive to protect your data, no online transmission is 100% secure. Users share information at their own discretion.
                        </p>
                    </section>

                    <section className="policy-section">
                        <h2>4. Information Sharing</h2>
                        <p>We may share information only:</p>
                        <ul>
                            <li>With trusted internal teams for operational purposes</li>
                            <li>With partnered schools or institutions (only when required for program delivery)</li>
                            <li>When required by law or legal authorities</li>
                        </ul>
                        <p>We ensure that any third-party association follows strict confidentiality standards.</p>
                    </section>

                    <section className="policy-section">
                        <h2>5. Children’s Privacy</h2>
                        <p>
                            Protecting children’s privacy is extremely important to us. RoboAIQ collects student information only with parental or guardian consent. We do not knowingly collect personal information from children without appropriate authorization.
                        </p>
                    </section>

                    <section className="policy-section">
                        <h2>6. Cookies & Tracking Technologies</h2>
                        <p>
                            Our website may use cookies to:
                        </p>
                        <ul>
                            <li>Enhance browsing experience</li>
                            <li>Analyze website traffic</li>
                            <li>Understand user preferences</li>
                        </ul>
                        <p>Users can choose to disable cookies through their browser settings.</p>
                    </section>

                    <section className="policy-section">
                        <h2>7. Third-Party Links</h2>
                        <p>
                            Our website may contain links to third-party websites. RoboAIQ is not responsible for the privacy practices or content of external sites. We encourage users to review their respective privacy policies.
                        </p>
                    </section>

                    <section className="policy-section">
                        <h2>8. Updates to This Privacy Policy</h2>
                        <p>
                            RoboAIQ reserves the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page with an updated effective date.
                        </p>
                    </section>

                    <section className="policy-section">
                        <h2>9. Contact Us</h2>
                        <p>For any questions or concerns regarding this Privacy Policy or your data, please contact us at:</p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <span>📧</span>{' '}
                                <ProtectedEmail
                                    user={ROBOAIQ_EMAILS.inquiry.user}
                                    domain={ROBOAIQ_EMAILS.inquiry.domain}
                                    style={{ color: 'inherit', textDecoration: 'underline' }}
                                >
                                    inquiry@roboaiq.in
                                </ProtectedEmail>
                            </div>
                            <div className="contact-item">
                                <span>📞</span> <span>+91 99624 99556</span>
                            </div>
                        </div>
                    </section>

                    <div className="privacy-footer-quote">
                        <p>“Your privacy matters to us. RoboAIQ is committed to protecting your personal information with transparency, integrity, and responsibility.”</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
