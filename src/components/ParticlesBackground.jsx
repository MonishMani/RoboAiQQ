import { useEffect, useRef } from 'react';
import './ParticlesBackground.css';

export default function ParticlesBackground({ count = 50, color = '#ff9933' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = color;
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = Math.random() * 10 + 10 + 's';
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [count, color]);

  return <div ref={containerRef} className="particles-background"></div>;
}
