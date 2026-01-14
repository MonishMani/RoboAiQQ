import React from 'react';
import CircularGallery from './CircularGallery';
import './GallerySection.css';

function GallerySection() {
  const galleryItems = [
    {
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      text: 'Robot Battle'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      text: 'Student Robot Showcase'
    },
    {
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      text: 'Robot Battle Championship'
    },
    {
      image: 'https://images.unsplash.com/photo-1485827404703-89b55271ce3f?w=800&h=600&fit=crop',
      text: 'Advanced Robotics Lab'
    },
    {
      image: 'https://images.unsplash.com/photo-1518611505868-48510c2e022f?w=800&h=600&fit=crop',
      text: 'Hands-On Training'
    },
    {
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      text: 'Team Building Event'
    }
  ];

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2>Student Robotics in Action</h2>
        <p>
          See our students build, program, and compete with their robots. Experience the
          excitement, teamwork, and innovation that happens in every class!
        </p>
      </div>

      <div className="gallery-container">
        <CircularGallery
          items={galleryItems}
          bend={2}
          textColor="#ffffff"
          borderRadius={0.08}
          font="bold 18px Figtree"
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
