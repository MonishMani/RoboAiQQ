import React, { useEffect, useRef } from "react";
import "./CircularCarousel3D.css";

export default function CircularCarousel3D({ items = [], autoSpeed = 0.0015, radius = 600 }) {
  const trackRef = useRef(null);

  // Default images if none provided
  const defaultImages = [
    "https://picsum.photos/500/300?1",
    "https://picsum.photos/500/300?2",
    "https://picsum.photos/500/300?3",
    "https://picsum.photos/500/300?4",
    "https://picsum.photos/500/300?5",
    "https://picsum.photos/500/300?6",
  ];

  const carouselItems = items && items.length ? items : defaultImages;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.children;
    let progress = 0;
    let animationFrameId = null;

    const update = () => {
      progress += autoSpeed;

      Array.from(cards).forEach((card, i) => {
        // Calculate angle for circular motion
        const angle = (i / cards.length) * Math.PI * 2 + progress;

        // Calculate 3D position on circle
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        // Normalize scale based on depth (z position)
        const scale = (z + radius) / (radius * 2);

        // Apply 3D transforms
        card.style.transform = `
          translateX(${x}px)
          translateZ(${z}px)
          scale(${0.6 + scale * 0.4})
          rotateY(${(angle * -180) / Math.PI}deg)
        `;

        // Set z-index based on depth
        card.style.zIndex = Math.floor(scale * 100);

        // Fade based on depth
        card.style.opacity = 0.5 + scale * 0.5;
      });

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [autoSpeed, radius]);

  return (
    <div className="circular-carousel-wrapper">
      <div className="circular-carousel-header">
        <h1 className="circular-carousel-title">
          <span className="gradient-text">PREMIUM</span> CAROUSEL
        </h1>
        <p className="circular-carousel-subtitle">
          Auto-rotating 3D circular carousel with smooth animations
        </p>
      </div>

      <div className="circular-carousel-container" style={{ perspective: "2000px" }}>
        <div
          ref={trackRef}
          className="circular-carousel-track"
          style={{
            transformStyle: "preserve-3d",
            width: "0px",
            height: "0px",
          }}
        >
          {carouselItems.map((src, i) => (
            <div
              key={i}
              className="circular-carousel-card"
              style={{
                width: "320px",
                height: "200px",
                left: "-160px",
                top: "-100px",
                transition: "transform 0.1s linear, opacity 0.1s linear",
              }}
            >
              <img
                src={src}
                alt={`carousel-item-${i}`}
                className="circular-carousel-image"
                draggable="false"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <button className="circular-carousel-cta">
        EXPLORE NOW ⚡
      </button>
    </div>
  );
}
