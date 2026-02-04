import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState } from 'react';
import "./WeRrcmUnique.css";

export default function Unique() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [hasError, setHasError] = useState(false);

  const handleVideoError = () => {
    console.error('Unique section video failed to load');
    setHasError(true);
  };

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
            {hasError ? (
              <img
                src="/assets/unique/roboaiq-unique-poster.jpg"
                alt="RoboAIQ unique features"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  aspectRatio: '16/9'
                }}
              />
            ) : (
              <video
                src="/assets/unique/roboaiq-unique.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="unique-video"
                aria-label="RoboAiQ unique features video"
                onError={handleVideoError}
                style={{
                  objectFit: 'cover',
                  aspectRatio: '16/9'
                }}
              />
            )}
          </div>

          {/* Features Grid */}

        </div>
      </div>
    </section>
  );
}
