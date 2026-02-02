import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * Hero Video Component with Premium Audio Unlock
 * Displays video on ALL devices (mobile, tablet, desktop)
 */
function HeroVideo() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  // Audio Debug Mode
  const [debugMode, setDebugMode] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDebugMode(params.get('audioDebug') === 'true');
  }, []);

  // Auto-hide prompt after 4 seconds if no interaction
  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Visibility Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        // Only manage audio if user has already unlocked it
        if (audioUnlocked) {
          if (entry.isIntersecting) {
            // Hero is visible: Unmute
            video.muted = false;
            setIsMuted(false);
          } else {
            // Hero scrolled away: Mute
            video.muted = true;
            setIsMuted(true);
          }
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [audioUnlocked]);

  const unlockAudio = () => {
    if (audioUnlocked) return; // Already unlocked

    const video = videoRef.current;
    if (!video) return;

    // Phase 2: User Activated
    video.muted = false;
    video.currentTime = 0; // Restart to play greeting
    video.play().then(() => {
      setIsMuted(false);
      setAudioUnlocked(true);
      setShowPrompt(false);
    }).catch(err => console.warn('Audio unlock failed:', err));
  };

  return (
    <motion.div
      className="hero-canvas"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      onClick={unlockAudio}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer'
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
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
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

      {/* Audio Prompt Overlay */}
      <AnimatePresence>
        {showPrompt && !audioUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: '20px',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          >
            <span style={{ fontSize: '14px' }}>🔊</span>
            <span style={{
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              whiteSpace: 'nowrap'
            }}>
              Tap to enable sound
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Audio Icon (Bottom Left) */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: audioUnlocked ? 'rgba(218, 165, 32, 0.8)' : 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        pointerEvents: 'none' // Clicks pass through to container
      }}>
        <span style={{ fontSize: '18px', filter: audioUnlocked ? 'none' : 'grayscale(1)' }}>
          {isMuted ? '🔇' : '🔊'}
        </span>
        {/* Pulse effect for muted state */}
        {!audioUnlocked && (
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(218, 165, 32, 0.6)',
            animation: 'pulse 2s infinite'
          }} />
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      {/* Debug Overlay */}
      {debugMode && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: '#0f0',
          padding: '8px',
          fontSize: '10px',
          fontFamily: 'monospace',
          zIndex: 100,
          pointerEvents: 'none'
        }}>
          <div>🔇 MUTED: {isMuted.toString()}</div>
          <div>🔓 UNLOCKED: {audioUnlocked.toString()}</div>
          <div>📢 PROMPT: {showPrompt.toString()}</div>
        </div>
      )}
    </motion.div>
  );
}

export default function Hero3DModel() {
  // Always render video for all devices
  return <HeroVideo />;
}
