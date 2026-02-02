import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// Base rotation for roboaiq-model
const BASE_ROTATION = [0, 0, 0];

function Robot({ scene }) {
  const group = useRef();

  // Enhanced "completely turnable" cursor-follow logic
  useFrame((state) => {
    if (!group.current) return;

    // Mapping mouse position [-1, 1] to rotation [-Math.PI, Math.PI] for full 360 turn
    const targetY = state.mouse.x * Math.PI;
    const targetX = (state.mouse.y * Math.PI) / 8; // Slight vertical tilt

    // Smooth interpolation (lerping) for a premium feel
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.1;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.1;
  });

  return (
    <group ref={group} rotation={BASE_ROTATION}>
      <primitive object={scene} scale={2.5} />
    </group>
  );
}

// Mobile Video Component with Premium Audio Unlock
function MobileVideo() {
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
      // User activates audio by tapping anywhere on the video area
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
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      >
        <source src="/assets/videos/video1.mp4" type="video/mp4" />
      </video>

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

// Desktop 3D Component
function Desktop3D() {
  const { scene } = useGLTF("/assets/models/roboaiq-model.glb");

  return (
    <motion.div
      className="hero-canvas"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <Canvas camera={{ position: [0, 1, 4], fov: 45 }} shadows>
        <ambientLight intensity={1.4} />
        <directionalLight
          position={[8, 6, 5]}
          intensity={2.5}
          castShadow
        />
        <pointLight position={[-5, 3, 2]} intensity={1.2} />
        <Environment preset="city" intensity={0.8} />

        <Float speed={1.2} rotationIntensity={0} floatIntensity={0.4}>
          <Robot scene={scene} />
        </Float>
      </Canvas>
    </motion.div>
  );
}

export default function Hero3DModel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render video for mobile, 3D for desktop
  return isMobile ? <MobileVideo /> : <Desktop3D />;
}

// Preload GLB only for desktop
if (typeof window !== 'undefined' && window.innerWidth >= 768) {
  useGLTF.preload("/assets/models/roboaiq-model.glb");
}

