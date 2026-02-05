import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * Hero Video Component
 * Cross-browser safe playback with mobile compatibility, unmute button, and error handling
 */
function HeroVideo() {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Scroll Visibility + Retry Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video || hasError) return;

        if (entry.isIntersecting) {
          // Attempt to play
          const playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.warn('Video autoplay prevented:', error);
            });
          }
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [hasError]);

  // Error handling with retry
  const handleVideoError = () => {
    console.error('Video failed to load');
    if (retryCount < 2) {
      // Retry loading
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
          setRetryCount(prev => prev + 1);
        }
      }, 1000 * (retryCount + 1)); // Exponential backoff
    } else {
      // Show fallback after 2 retries
      setHasError(true);
    }
  };

  return (
    <motion.div
      className="hero-canvas"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Video/Fallback Wrapper - Fixed aspect ratio to prevent CLS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -8, 0] // Floating animation
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.03 }}
        style={{
          position: 'relative',
          maxWidth: '600px',
          width: '100%',
          aspectRatio: '16/9', // Lock aspect ratio for CLS prevention
          minHeight: '337px', // Reserve space
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 40px rgba(218, 165, 32, 0.1)',
          willChange: 'transform',
        }}
      >
        {hasError ? (
          /* Fallback Image */
          <img
            src="/assets/images/robot-poster.png"
            alt="RoboAIQ Robot"
            width="600"
            height="337"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/images/robot-poster.png"
              width="600"
              height="337"
              fetchPriority="high"
              onError={handleVideoError}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            >
              <source src="/assets/videos/video3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>

        )}

        {/* Soft Glow Effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(218, 165, 32, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          mixBlendMode: 'overlay'
        }} />
      </motion.div>
    </motion.div>
  );
}

export default function Hero3DModel() {
  // Always render video for all devices
  return <HeroVideo />;
}
