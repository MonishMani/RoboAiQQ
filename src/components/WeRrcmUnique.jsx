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
          What Makes <span>RoboAIQ</span> Unique?
        </h2>

        <div className={`unique-layout ${sectionVisible ? 'visible' : ''}`}>

          {/* Video Visual */}
          <div className="unique-video-wrapper glass-premium">
            <video
              src="/assets/Unique/Roboaiq_unique.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="unique-video"
              aria-label="RoboAiQ unique features video"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Features Grid */}
          <div className="unique-features-grid">
            <div className="feature-card glass-premium scroll-reveal stagger-1">
              <h4>World-Class Team</h4>
              <p>Highly skilled professionals</p>
            </div>
            <div className="feature-card glass-premium scroll-reveal stagger-2">
              <h4>Global Expertise</h4>
              <p>International billing standards</p>
            </div>
            <div className="feature-card glass-premium scroll-reveal stagger-3">
              <h4>Compliance Driven</h4>
              <p>HIPAA & regulatory focus</p>
            </div>
            <div className="feature-card glass-premium scroll-reveal stagger-4">
              <h4>Hands-On Support</h4>
              <p>Dedicated account managers</p>
            </div>
            <div className="feature-card glass-premium scroll-reveal stagger-5">
              <h4>Small Batch Scale</h4>
              <p>Personalized attention</p>
            </div>
            <div className="feature-card glass-premium scroll-reveal stagger-6">
              <h4>Industry Leaders</h4>
              <p>Years of proven results</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
