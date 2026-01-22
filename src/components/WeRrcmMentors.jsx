import React from 'react';
import ChromaGrid from './ChromaGrid';
import './WeRrcmMentors.css';

import mentorNarsing from '../assets/mentors/mentor_narsing.png';
import mentorTamizharasan from '../assets/mentors/mentor_tamizharasan.png';
import mentorSarah from '../assets/mentors/mentor_sarah.png';
import mentorMike from '../assets/mentors/mentor_mike.png';
import mentorAlex from '../assets/mentors/mentor_alex.png';
import mentorJordan from '../assets/mentors/mentor_jordan.png';

function WeRrcmMentors() {
  const mentors = [
    {
      image: mentorNarsing,
      title: 'Narsing Chappe',
      subtitle: 'Robotics & Mathematics Specialist',
      handle: 'IIT Bombay',
      borderColor: '#ff9933',
      gradient: 'linear-gradient(145deg, #ff9933, #000)',
      url: 'https://github.com/'
    },
    {
      image: mentorTamizharasan,
      title: 'Tamizharasan K',
      subtitle: 'Robotics & Programming Specialist',
      handle: '@tamizharasan',
      borderColor: '#3B82F6',
      gradient: 'linear-gradient(180deg, #3B82F6, #000)',
      url: 'https://linkedin.com/'
    },
    {
      image: mentorSarah,
      title: 'Sarah Johnson',
      subtitle: 'AI & Computer Vision Specialist',
      handle: '@sarah_ai',
      borderColor: '#10B981',
      gradient: 'linear-gradient(145deg, #10B981, #000)',
      url: 'https://github.com/'
    },
    {
      image: mentorMike,
      title: 'Mike Chen',
      subtitle: 'Embedded Systems Architect',
      handle: '@mike_embed',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(180deg, #8B5CF6, #000)',
      url: 'https://linkedin.com/'
    },
    {
      image: mentorAlex,
      title: 'Alex Rivera',
      subtitle: 'Mechatronics Engineer',
      handle: '@alex_mech',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(145deg, #F59E0B, #000)',
      url: 'https://github.com/'
    },
    {
      image: mentorJordan,
      title: 'Jordan Chen',
      subtitle: 'ROS2 Framework Expert',
      handle: '@jordan_ros',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(210deg, #06B6D4, #000)',
      url: 'https://linkedin.com/'
    }
  ];

  return (
    <section className="wrrcm-mentors">
      <h2>Meet Our Expert Mentors</h2>
      <p className="mentors-subtitle">Learn from industry experts and experienced robotics professionals</p>

      <div style={{ height: '900px', position: 'relative' }}>
        <ChromaGrid
          items={mentors}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </section>
  );
}

export default WeRrcmMentors;
