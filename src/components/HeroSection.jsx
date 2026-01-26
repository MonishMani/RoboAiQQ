import { useState } from 'react';
import './HeroSection.css';
import BookingModal from './BookingModal';
import Hero3DModel from './Hero3DModel';

function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBooking = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="hero" id="home">
        <div className="container hero-container">
          {/* Left Side - Text Content */}
          <div className="hero-left hero-animate-text">
            <span className="eyebrow">NEXT GENERATION EDUCATION</span>

            <h1>
              Children, Transform Your Future With <span>Robotics</span> & <span>AI</span>
            </h1>

            <p className="subtitle">
              Parents, empower your children with world-class Robotics and AI education, hands-on experience, and state-of-the-art future readiness for tomorrow's opportunities.
            </p>
          </div>

          {/* Right Side - Visual with CTA */}
          <div className="hero-right">
            <div className="hero-visual">
              <div className="robot-container">
                <Hero3DModel />
              </div>
            </div>

            {/* CTA Button - Positioned next to video */}
            <div className="hero-cta-container">
              <button
                className="hero-cta-btn"
                onClick={handleOpenBooking}
              >
                <span className="cta-icon">🤖</span>
                <span className="cta-text">
                  <strong>Book Your Free Demo</strong>
                  <small>Start Building Today</small>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default HeroSection;
