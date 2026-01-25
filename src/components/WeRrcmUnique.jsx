import { useScrollAnimation } from '../hooks/useScrollAnimation';
import "./WeRrcmUnique.css";

export default function Unique() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section ref={sectionRef} className="unique-section section-parallax" id="about">
      <div className="container">
        <h2
          ref={titleRef}
          className={`unique-title scroll-reveal ${titleVisible ? 'visible' : ''}`}
        >
          What Makes RoboAIQ Unique?
        </h2>

        <div className={`unique-wrapper ${sectionVisible ? 'visible' : ''}`}>
          {/* Galaxy glow */}
          <div className="galaxy-glow"></div>

          {/* Rings */}
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>

          {/* Center */}
          <div className="unique-center glass-premium">
            <h3>RoboAiQ</h3>
            <p>Robotics Education Excellence</p>
          </div>

          {/* Orbit items */}
          <div className={`orbit orbit-1 scroll-reveal stagger-1 ${sectionVisible ? 'visible' : ''}`}>
            <span className="node"></span>
            <span className="line"></span>
            <div className="orbit-text card-premium glass-premium">
              <h4>World-Class Team</h4>
              <p>Highly skilled professionals</p>
            </div>
          </div>

          <div className={`orbit orbit-2 scroll-reveal stagger-2 ${sectionVisible ? 'visible' : ''}`}>
            <span className="node"></span>
            <span className="line"></span>
            <div className="orbit-text card-premium glass-premium">
              <h4>Global Expertise</h4>
              <p>International billing standards</p>
            </div>
          </div>

          <div className={`orbit orbit-3 scroll-reveal stagger-3 ${sectionVisible ? 'visible' : ''}`}>
            <span className="node"></span>
            <span className="line"></span>
            <div className="orbit-text card-premium glass-premium">
              <h4>Compliance Driven</h4>
              <p>HIPAA & regulatory focus</p>
            </div>
          </div>

          <div className={`orbit orbit-4 scroll-reveal stagger-4 ${sectionVisible ? 'visible' : ''}`}>
            <span className="node"></span>
            <span className="line"></span>
            <div className="orbit-text card-premium glass-premium">
              <h4>Hands-On Support</h4>
              <p>Dedicated account managers</p>
            </div>
          </div>

          <div className={`orbit orbit-5 scroll-reveal stagger-5 ${sectionVisible ? 'visible' : ''}`}>
            <span className="node"></span>
            <span className="line"></span>
            <div className="orbit-text card-premium glass-premium">
              <h4>Small Batch Scale</h4>
              <p>Personalized attention</p>
            </div>
          </div>

          <div className={`orbit orbit-6 scroll-reveal stagger-6 ${sectionVisible ? 'visible' : ''}`}>
            <span className="node"></span>
            <span className="line"></span>
            <div className="orbit-text card-premium glass-premium">
              <h4>Industry Leaders</h4>
              <p>Years of proven results</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
