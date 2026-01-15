import { useEffect, useRef, useState } from 'react';
import LightRays from './LightRays';
import Galaxy from './Galaxy';
import './HeroSection.css';

function HeroSection() {
  const revealContainerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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

  // Handle mouse movement for reveal effect
  const handleMouseMove = (e) => {
    if (!revealContainerRef.current) return;

    const rect = revealContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Update CSS variable for mask and glow position
    revealContainerRef.current.style.setProperty('--mouse-x', `${x}px`);
    revealContainerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

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

        <div className="features">
          <div className="feature-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor" />
              </svg>
            </div>
            <h3>AI-Powered Learning</h3>
            <p>Advanced robotics curriculum integrated with artificial intelligence.</p>
          </div>

          <div className="feature-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.5c1.93 0 3.5-1.57 3.5-3.5S13.93 8.5 12 8.5s-3.5 1.57-3.5 3.5 1.57 3.5 3.5 3.5zm0-5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm8-3h-1.92c-.4-1.25-1.28-2.34-2.41-3h3.33L20 7.5zm-8 17c-2.13 0-4.17-.68-5.88-1.96l1.3-1.3c1.38.92 3.02 1.46 4.58 1.46s3.2-.54 4.58-1.46l1.3 1.3C16.17 18.82 14.13 19.5 12 19.5zm0-2.5c-1.93 0-3.5-1.57-3.5-3.5h2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h2c0 1.93-1.57 3.5-3.5 3.5zM4 7.5l.92 0c1.13.66 2.01 1.75 2.41 3H4v-3zm8-5c2.13 0 4.17.68 5.88 1.96l-1.3 1.3c-1.38-.92-3.02-1.46-4.58-1.46s-3.2.54-4.58 1.46l-1.3-1.3C7.83 3.18 9.87 2.5 12 2.5zm0 2.5c-1.93 0-3.5 1.57-3.5 3.5H6.5c0-2.49 2.01-4.5 4.5-4.5s4.5 2.01 4.5 4.5h-2c0-1.93-1.57-3.5-3.5-3.5z" fill="currentColor" />
              </svg>
            </div>
            <h3>Cutting-Edge Technology</h3>
            <p>Industry-standard tools and platforms used by professionals.</p>
          </div>

          <div className="feature-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
              </svg>
            </div>
            <h3>Global Recognition</h3>
            <p>International competition victories and prestigious awards.</p>
          </div>

          <div className="feature-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6.18L23 9 12 3zm6.82 6L12 5.18 5.18 9 12 11.82 18.82 9z" fill="currentColor" />
              </svg>
            </div>
            <h3>Excellence in STEM</h3>
            <p>Comprehensive training in Science, Technology, Engineering & Math.</p>
          </div>
        </div>

        <div className="stats">
          <div>
            <h4>500+</h4>
            <span>Students Trained</span>
          </div>
          <div>
            <h4>50+</h4>
            <span>Awards Won</span>
          </div>
          <div>
            <h4>15+</h4>
            <span>Countries Reached</span>
          </div>
          <div>
            <h4>100%</h4>
            <span>Success Rate</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
