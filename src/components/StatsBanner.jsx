import React from 'react';
import './StatsBanner.css';

function StatsBanner() {
  const stats = [
    {
      number: '60+',
      label: 'Workshops/Industrial\nTrainings'
    },
    {
      number: '1,950+',
      label: 'College Reach'
    },
    {
      number: '60,000+',
      label: 'Mentees Enrolled'
    },
    {
      number: '35+',
      label: 'Mentors Pool'
    }
  ];

  return (
    <section className="stats-banner">
      <div className="stats-banner-grid"></div>
      <div className="stats-banner-container">
        {stats.map((stat, index) => (
          <div key={index} className="stats-column">
            <div className="stats-number">{stat.number}</div>
            <div className="stats-text">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsBanner;
