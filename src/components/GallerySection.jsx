import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import CircularGallery from './CircularGallery';
import './GallerySection.css';

function GallerySection() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 });

  const galleryItems = [
    {
      image: '/assets/images/students-action-01.jpg',
      text: 'Championship Winners'
    },
    {
      image: '/assets/images/students-action-02.jpg',
      text: 'Battle of Robots Arena'
    },
    {
      image: '/assets/images/students-action-03.jpg',
      text: 'Team Recognition'
    },
    {
      image: '/assets/images/students-action-04.jpg',
      text: 'Award Ceremony'
    },
    {
      image: '/assets/images/students-action-05.jpg',
      text: 'Young Achievers'
    },
    {
      image: '/assets/images/students-action-06.jpg',
      text: 'District Recognition'
    },
    {
      image: '/assets/images/students-action-07.jpg',
      text: 'Project Collaboration'
    },
    {
      image: '/assets/images/students-action-08.jpg',
      text: 'International Camp'
    },
    {
      image: '/assets/images/students-action-09.jpg',
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
          textColor="#1F40AF"
          borderRadius={0.08}
          font="bold 24px 'Poppins', sans-serif"
          scrollSpeed={1.3}
          scrollEase={0.12}
          autoScroll={true}
          autoScrollSpeed={0.05}
        />
      </div>
    </section>
  );
}

export default GallerySection;

