import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import CircularGallery from './CircularGallery';
import './GallerySection.css';

function GallerySection() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 });

  const galleryItems = [
    {
      image: '/images/students_action_01.jpg',
      text: 'Championship Winners'
    },
    {
      image: '/images/students_action_02.jpg',
      text: 'Battle of Robots Arena'
    },
    {
      image: '/images/students_action_03.jpg',
      text: 'Team Recognition'
    },
    {
      image: '/images/students_action_04.jpg',
      text: 'Award Ceremony'
    },
    {
      image: '/images/students_action_05.jpg',
      text: 'Young Achievers'
    },
    {
      image: '/images/students_action_06.jpg',
      text: 'District Recognition'
    },
    {
      image: '/images/students_action_07.jpg',
      text: 'Project Collaboration'
    },
    {
      image: '/images/students_action_08.jpg',
      text: 'International Camp'
    },
    {
      image: '/images/students_action_09.jpg',
      text: 'Mentorship Moments'
    }
  ];

  return (
    <section ref={sectionRef} className="gallery-section section-parallax" id="student-photos">
      <div
        ref={headerRef}
        className={`gallery-header scroll-reveal ${headerVisible ? 'visible' : ''}`}
      >
        <h2>Student <span>Robotics</span> in Action</h2>
        <p>
          See our students build, program, and compete with their robots. Experience the
          excitement, teamwork, and innovation that happens in every class!
        </p>
      </div>

      <div className={`gallery-container scroll-scale ${sectionVisible ? 'visible' : ''}`}>
        <CircularGallery
          items={galleryItems}
          bend={2}
          textColor="#2553EB"
          borderRadius={0.08}
          font="bold 20px 'Orbitron', sans-serif"
          scrollSpeed={1.3}
          scrollEase={0.05}
          autoScroll={true}
          autoScrollSpeed={0.15}
        />
      </div>
    </section>
  );
}

export default GallerySection;

