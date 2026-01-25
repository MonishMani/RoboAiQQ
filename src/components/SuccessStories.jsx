import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ImageAutoSlider } from './ui/image-auto-slider';
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
          <h2>Competition Success Stories</h2>
          <p>
            Celebrating student excellence through national and international
            recognition
          </p>
        </div>

        <div className="success-stories-content">
          {/* Image Auto Slider */}
          <ImageAutoSlider images={successImages} />
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;
