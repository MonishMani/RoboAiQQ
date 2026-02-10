import { useState, useEffect } from 'react';
import './HeroSection.css';
import './HeroSection-mobile.css';
import BookingModal from './BookingModal';
import Hero3DModel from './Hero3DModel';

/**
 * HeroSection Component
 * Premium hero with enlarged badge and professional CTA button
 */
function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBooking = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleOpenBookingEvent = () => {
      setIsModalOpen(true);
    };

    document.addEventListener('openBookingModal', handleOpenBookingEvent);
    return () => {
      document.removeEventListener('openBookingModal', handleOpenBookingEvent);
    };
  }, []);

  return (
    <>
      <section className="hero" id="home">
        {/* Hero Content Wrapper - Center-aligned max-width container */}
        <div className="hero-wrapper">
          <div className="container hero-container">
            {/* Left Side - Text Content - Centered */}
            <div className="hero-left hero-animate-text">
              {/* Premium Enlarged Badge - Centered Above Content */}
              <span className="hero-badge">
                <span className="badge-glow"></span>
                <span className="badge-text">NEXT GENERATION EDUCATION</span>
              </span> 

              {/* Main Headline */}
              <h1>
                Shaping Future CEOs. <span className="highlight">Inspiring Young Entrepreneurs.</span>
              </h1>

              {/* Subtitle */}
              <p className="subtitle">
                RoboAiQ isn’t just an Education program — it’s a launchpad for future CEO's, Innovators, and Technology Leaders.
              </p>

              {/* Premium CTA Button - Directly under text content */}
              <div className="hero-cta-wrapper">
                <button
                  className="hero-cta-btn"
                  onClick={handleOpenBooking}
                  aria-label="Book your free demo"
                >
                  <span className="cta-primary">Book Your Free Demo</span>
                </button>
              </div>
            </div>

            {/* Right Side - 3D Visual */}
            <div className="hero-right">
              <div className="hero-visual">
                <div className="robot-container">
                  <Hero3DModel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default HeroSection;
