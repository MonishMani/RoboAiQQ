import React, { useState, useEffect } from 'react';
import './image-auto-slider.css';

export const ImageAutoSlider = ({ images }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 20s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>

      <div className="slider-wrapper">
        <div className="scroll-container">
          <div className="infinite-scroll flex gap-6 w-max">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="image-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-2xl relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={image.src}
                  alt={image.alt || `Gallery image ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Hover overlay */}
                {hoveredIndex === index && (
                  <div className="image-overlay">
                    {image.title && <h3 className="overlay-title">{image.title}</h3>}
                    {image.description && <p className="overlay-description">{image.description}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div className="gradient-overlay" />
      </div>
    </>
  );
};
