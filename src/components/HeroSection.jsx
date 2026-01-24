import { useState, useEffect } from 'react';
import './HeroSection.css';
import BookingModal from './BookingModal';

function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Loop 3D model animation with increased speed
    const splineViewers = document.querySelectorAll('spline-viewer');
    splineViewers.forEach(viewer => {
      viewer.addEventListener('load', () => {
        if (viewer.setPlaybackRate) {
          viewer.setPlaybackRate(2.5);
        }
        if (viewer.setLoop) {
          viewer.setLoop(true);
        }
        if (viewer.play) {
          viewer.play();
        }
      });
    });

    // Ensure animations loop continuously
    const interval = setInterval(() => {
      splineViewers.forEach(viewer => {
        if (viewer.play && !viewer.isPlaying) {
          viewer.play();
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenBooking = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="hero hero-main" id="home">
        {/* Left Side - Text Content */}
        <div className="hero-left">
          <span className="eyebrow">NEXT GENERATION EDUCATION</span>

          <h1>
            Transform <span>Your</span> Future<br />
            With Robotics
          </h1>

          <p className="subtitle">
            Empowering students with world-class robotics education, cutting-edge
            technology, and hands-on experience that prepares them for tomorrow's challenges.
          </p>

          <div className="cta">
            <a
              href="#"
              className="btn primary btn-premium"
            >
              Explore Programs
            </a>
          </div>
        </div>

        {/* Center - Robot Model */}
        <div className="hero-center">
          <div className="robot-container">
            <div className="robot-viewer">
              <spline-viewer url="https://prod.spline.design/2U23PaGiIpgFhZLX/scene.splinecode" camera-controls="false" background="transparent"></spline-viewer>
            </div>
          </div>
        </div>

        {/* Right Side - Promo Content */}
        <div className="hero-right-promo glass-premium">
          <h2>Build Your First Robot!</h2>
          <a
            href="#"
            className="btn primary btn-premium"
            onClick={handleOpenBooking}
          >
            Book a Free Demo Class
          </a>
        </div>
      </section>

      {/* Secondary Section - Additional Promo */}
      <section className="hero hero-second">
        <section className="promo-hero glass-premium">
          <div className="promo-hero-left">
            <h2>Master Robotics Through Projects</h2>
            <p>From basic electronics to advanced mechatronics – join RoboAiQ and master robotics through hands-on projects. Perfect for students aged 10-18!</p>
            <div className="promo-hero-buttons">
              <a href="#" className="promo-hero-btn secondary btn-premium">Download Sample Project</a>
            </div>
          </div>
          <div className="promo-hero-right">
            <img src="/robo-white-removebg-preview.png" alt="Robot" />
          </div>
        </section>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default HeroSection;

