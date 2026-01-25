import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import MagicBento from './MagicBento';
import './SuccessStories.css';

function SuccessStories() {
  const gridRef = useRef(null);
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 });

  const successImages = [
    {
      src: '/assets/1.jpeg',
      alt: 'Deputy CM Recognition',
      title: 'State-Level Recognition',
      description: 'Honored by the Deputy Chief Minister of Tamil Nadu'
    },
    {
      src: '/assets/2.jpeg',
      alt: 'CM Puducherry Recognition',
      title: 'National Excellence',
      description: 'Recognized by the Chief Minister of Puducherry'
    },
    {
      src: '/assets/3.jpeg',
      alt: 'District Collector Award',
      title: 'District Achievement',
      description: 'Awarded by the Dindigul District Collector'
    },
    {
      src: '/assets/4.jpeg',
      alt: 'Robotics Competition',
      title: 'Robotics Championship',
      description: 'Outstanding performance in robotics competitions'
    },
    {
      src: '/assets/5.jpeg',
      alt: 'Innovation Award',
      title: 'Innovation Award',
      description: 'Recognized for innovation and technical excellence'
    },
    {
      src: '/assets/6.jpeg',
      alt: 'Student Excellence',
      title: 'Student Excellence',
      description: 'Demonstrating leadership and technical skill'
    }
  ];

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.success-image-card');

    cards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="success-stories section-parallax"
      id="success-stories"
    >
      <div className="container">
        <div
          ref={headerRef}
          className={`success-stories-header scroll-reveal ${headerVisible ? 'visible' : ''
            }`}
        >
          <h2>Competition <span>Success</span> <span>Stories</span></h2>
          <p>
            Celebrating student excellence through national and international
            recognition
          </p>
        </div>

        <div className="success-stories-content">
          {/* Magic Bento */}
          <div className="magic-bento-wrapper">
            <MagicBento
              textAutoHide={true}
              enableStars={false}
              enableSpotlight={false}
              enableBorderGlow={true}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
              spotlightRadius={50}
              particleCount={12}
              glowColor="132, 0, 255"
              disableAnimations={false}
              cardData={successImages}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;
