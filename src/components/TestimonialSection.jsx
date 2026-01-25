import React from 'react';
import './TestimonialSection.css';

function TestimonialSection() {
  return (
    <section className="testimonial-section">
      <h2>What Our <span>Students</span> Say</h2>

      <div className="testimonial">
        <p>
          "I built my <span className="keyword">first line-following robot</span> in just <span className="keyword">3 weeks</span>!
          The <span className="subtext">hands-on approach made learning fun</span>."
        </p>
        <strong>— Arjun Sharma (Age 15)</strong>
      </div>
    </section>
  );
}

export default TestimonialSection;
