import React from 'react';
import './RoadmapSection.css';

function RoadmapSection() {
  return (
    <section className="roadmap-section">
      <h2>Your <span>Robotics</span> Journey</h2>

      <div className="roadmap">
        <div className="step">
          <h3>01 <span>Electronics</span> Basics</h3>
          <p><span className="subtext">Circuits, breadboards, components</span></p>
        </div>
        <div className="step">
          <h3>02 <span>Sensors</span> & <span>Coding</span></h3>
          <p><span className="subtext">Arduino programming & sensors</span></p>
        </div>
        <div className="step">
          <h3>03 <span>Motors</span></h3>
          <p><span className="subtext">DC, Servo & mechanical systems</span></p>
        </div>
        <div className="step">
          <h3>04 <span>Robot</span> Build</h3>
          <p><span className="subtext">Fully functional robot</span></p>
        </div>
      </div>
    </section>
  );
}

export default RoadmapSection;
