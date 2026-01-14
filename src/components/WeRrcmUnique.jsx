import React from 'react';
import ScrollFloat from './ScrollFloat';
import './WeRrcmUnique.css';

function WeRrcmUnique() {
  const features = [
    {
      title: 'World-Class Education',
      description: 'Learn from industry experts with global competition experience',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: 'Hands-On Projects',
      description: 'Build real robots from day one with practical, project-based learning',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: 'Competition Ready',
      description: 'Prepare for international robotics competitions and challenges',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6.18L23 9 12 3zm6.82 6L12 5.18 5.18 9 12 11.82 18.82 9z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: 'Small Batch Sizes',
      description: 'Personalized attention with limited students per batch',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.89 1.97 1.91 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <section className="wrrcm-unique">
      <div className="wrrcm-unique-content">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          <h2 className="wrrcm-title">What Makes WeRrcm Unique?</h2>
        </ScrollFloat>

        <span className="wrrcm-tag">World Education & Robotic Research Center for Mechatronics</span>
        <p className="wrrcm-sub">Where young minds transform into robotics innovators</p>

        <div className="wrrcm-divider"></div>

        <div className="wrrcm-highlight">
          <div className="highlight-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
          </div>
          <h3>Specialized in STEM Training</h3>
          <p>
            <strong>STEM</strong> is an acronym that stands for <strong>Science</strong>, <strong>Technology</strong>, <strong>Engineering</strong>, and <strong>Mathematics</strong>.<br/>
            At WeRrcm, we integrate all four STEM disciplines into our comprehensive robotics curriculum, preparing students for the future of innovation and technology.
          </p>
        </div>

        <div className="wrrcm-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="wrrcm-feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default WeRrcmUnique;
