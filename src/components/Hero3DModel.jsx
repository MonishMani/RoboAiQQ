import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * Hero Video Component
 * Auto-plays with sound when in viewport, mutes when out.
 * No visible controls.
 */
function HeroVideo() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Scroll Visibility Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          // Hero is visible: Unmute
          setIsMuted(false);
          // Attempt to play if paused (e.g. by browser policy on previous unmute attempt)
          video.play().catch(() => {
            // Autoplay with sound usually blocked without user interaction.
            // We catch the error to prevent console noise.
          });
        } else {
          // Hero scrolled away: Mute
          setIsMuted(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      {/* Video Wrapper - Constrained Container */}
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
          aspectRatio: '16/9', // Lock aspect ratio
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 40px rgba(218, 165, 32, 0.1)',
          willChange: 'transform',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted} // Controlled by intersection observer
          playsInline
          poster="/assets/images/robot-poster.png"
          width="600"
          height="337"
          fetchPriority="high"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Prevent stretching
            display: 'block'
          }}
        >
          <source src="/assets/videos/video1.mp4" type="video/mp4" />
        </video>

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
