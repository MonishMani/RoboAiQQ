import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './SuccessStories.css';

function SuccessStories() {
  const gridRef = useRef(null);

  const successImages = [
    { src: '/assets/1.jpeg', alt: 'Success Story 1' },
    { src: '/assets/2.jpeg', alt: 'Success Story 2' },
    { src: '/assets/3.jpeg', alt: 'Success Story 3' },
    { src: '/assets/4.jpeg', alt: 'Success Story 4' },
    { src: '/assets/5.jpeg', alt: 'Success Story 5' },
    { src: '/assets/6.jpeg', alt: 'Success Story 6' }
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
    <section className="success-stories" id="success-stories">
      <div className="success-stories-header">
        <h2>Competition Success Stories</h2>
        <p>Our students compete and win at international robotics competitions</p>
      </div>

      <div className="success-stories-content">
        <div className="success-stories-intro">
          <div className="prestige-badge">PRESTIGIOUS RECOGNITION</div>
          <h3>Student Honored by Deputy Chief Minister of Tamil Nadu</h3>
          <p>Mr. Yogesh Poornachandran receives prestigious award from the Deputy Chief Minister of Tamil Nadu, recognizing excellence in robotics and academic achievement</p>
        </div>

        <div className="success-stories-intro">
          <div className="prestige-badge">PRESTIGIOUS RECOGNITION</div>
          <h3>Student Honored by Chief Minister of Puducherry</h3>
          <p>Mr. Yogesh Poornachandran receives prestigious award from the Chief Minister of Puducherry, recognizing excellence in robotics and academic achievement</p>
        </div>

        <div className="success-stories-intro">
          <div className="prestige-badge">PRESTIGIOUS RECOGNITION</div>
          <h3>Student Honored by Dindigul District Collector</h3>
          <p>Mr. Yogesh Poornachandran receives prestigious award from the District Collector of Dindigul, Tamil Nadu, recognizing excellence in robotics and academic achievement</p>
        </div>

        <div className="success-image-grid" ref={gridRef}>
          {successImages.map((image, index) => (
            <div key={index} className="success-image-card">
              <div className="success-image-wrapper">
                <img src={image.src} alt={image.alt} className="success-image" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;
