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
              src="/assets/unique/roboaiq-unique.mp4"
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
         
        </div>
      </div>
    </section>
  );
}
