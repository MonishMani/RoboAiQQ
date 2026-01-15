import { useEffect } from 'react';
import Galaxy from './Galaxy';
import './HeroSection.css';

function HeroSection() {
  useEffect(() => {
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');

    if (heroLeft && heroRight) {
      heroLeft.style.opacity = '0';
      heroLeft.style.transform = 'translateX(-20px)';
      heroRight.style.opacity = '0';
      heroRight.style.transform = 'translateX(20px)';

      setTimeout(() => {
        heroLeft.style.transition = 'all 0.8s ease';
        heroRight.style.transition = 'all 0.8s ease';
        heroLeft.style.opacity = '1';
        heroLeft.style.transform = 'translateX(0)';
        heroRight.style.opacity = '1';
        heroRight.style.transform = 'translateX(0)';
      }, 100);
    }

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

  return (
    <>
    
      <div className="hero-right">
        <div className="robot-container">
          <div className="robot-viewer">
            <spline-viewer url="https://prod.spline.design/2U23PaGiIpgFhZLX/scene.splinecode" camera-controls="false"></spline-viewer>
          </div>
        </div>
      </div>
*

      <section className="hero hero-second">
        <div className="orb-background">
          <Galaxy
            mouseInteraction={false}
            hueShift={260}
            glowIntensity={0.8}
            rotationSpeed={0.05}
            transparent={true}
          />
        </div>

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
          <a href="#" className="btn primary">Explore Programs</a>
          <a href="#" className="btn ghost">Watch Demo</a>
        </div>


        <section className="promo-hero">
          <div className="promo-hero-left">
            <h2>Build Your First Robot!</h2>
            <p>From basic electronics to advanced mechatronics – join WeRrcm and master robotics through hands-on projects. Perfect for students aged 10-18!</p>
            <div className="promo-hero-buttons">
              <a href="#" className="promo-hero-btn primary">Book a Free Demo Class</a>
              <a href="#" className="promo-hero-btn secondary">Download Sample Project</a>
            </div>
          </div>
          <div className="promo-hero-right">
            <img src="/robo-white-removebg-preview.png" alt="Robot" />
          </div>
        </section>

       
      </section>
    </>
  );
}

export default HeroSection;
