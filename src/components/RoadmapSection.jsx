import React from 'react';
import './RoadmapSection.css';

function RoadmapSection() {
  return (
    <section className="roadmap-section">
      <h2>Your <span>Robotics</span> Journey</h2>

      <div className="roadmap">
        <div className="step">
          <h3>01 Electronics Basics</h3>
          <p>Circuits, breadboards, components</p>
        </div>
        <div className="step">
          <h3>02 Sensors & Coding</h3>
          <p>Arduino programming & sensors</p>
        </div>
        <div className="step">
          <h3>03 Motors</h3>
          <p>DC, Servo & mechanical systems</p>
        </div>
        <div className="step">
          <h3>04 Robot Build</h3>
          <p>Fully functional robot</p>
        </div>
      </div>
    </section>
  );
}

export default RoadmapSection;
