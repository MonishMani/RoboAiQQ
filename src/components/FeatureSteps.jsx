import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FeatureSteps.css";

export function FeatureSteps({
  features,
  className = "",
  title = "How to get Started",
  autoPlayInterval = 5000,
}) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef(null);

  // Auto-play Logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, features.length, autoPlayInterval]);

  // Manual Click Handler
  const handleStepClick = (index) => {
    setCurrentFeature(index);
    setIsPaused(true);

    // Resume auto-play after 15 seconds of inactivity
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 15000);
  };

  return (
    <div className={`feature-steps-container ${className}`}>
      <div className="feature-steps-wrapper">
        <h2 className="feature-steps-title">{title}</h2>

        <div className="feature-steps-grid">
          {/* Steps List */}
          <div className="feature-steps-list">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`feature-step-item ${index === currentFeature ? "active" : ""}`}
                onClick={() => handleStepClick(index)}
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.5,
                  scale: index === currentFeature ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
                role="button"
                tabIndex={0}
                aria-label={`Select step ${index + 1}: ${feature.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleStepClick(index);
                }}
              >
                <div className="step-progress-wrapper">
                  <motion.div
                    className={`feature-step-indicator ${index === currentFeature ? "active" : ""
                      }`}
                  >
                    {index < currentFeature ? (
                      <span className="checkmark">✓</span>
                    ) : (
                      <span className="step-number">{index + 1}</span>
                    )}
                  </motion.div>
                  {/* Vertical Line Connector */}
                  {index !== features.length - 1 && (
                    <div className="step-connector">
                      <motion.div
                        className="step-connector-fill"
                        initial={{ height: "0%" }}
                        animate={{ height: index < currentFeature ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>

                <div className="feature-step-content">
                  <h3 className="feature-step-title">
                    {feature.title || feature.step}
                  </h3>
                  <p className="feature-step-description">{feature.content}</p>

                  {/* Mobile-only active indicator */}
                  {index === currentFeature && (
                    <motion.div
                      className="active-bar-mobile"
                      layoutId="activeBar"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Display */}
          <div className="feature-steps-image-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                className="feature-step-image-wrapper"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <img
                  src={features[currentFeature].image}
                  alt={features[currentFeature].step}
                  className="feature-step-image"
                />

                {/* Progress Bar Overlay */}
                {!isPaused && (
                  <div className="image-progress-bar">
                    <motion.div
                      className="image-progress-fill"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
                    />
                  </div>
                )}

                <div className="feature-step-image-gradient" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSteps;
