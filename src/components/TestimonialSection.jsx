import React from 'react';
import './TestimonialSection.css';

function TestimonialSection() {
  return (
    <section className="testimonial-section">
      <h2>What Our <span>Students</span> Say</h2>

      <div className="testimonial">
        <p>
          "I built my first line-following robot in just 3 weeks!
          The hands-on approach made learning fun."
        </p>
        <strong>— Arjun Sharma (Age 15)</strong>
      </div>
    </section>
  );
}

export default TestimonialSection;
