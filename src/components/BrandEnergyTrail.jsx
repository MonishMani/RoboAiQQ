import { useEffect, useState, useRef } from 'react';
import './BrandEnergyTrail.css';

/**
 * Premium Brand Energy Trail Animation
 * 
 * Behavior:
 * 1. Spawns an energy orb at bottom-left
 * 2. Travels via Bezier curve to the Logo position
 * 3. Emits golden star particles
 * 4. Triggers impact callback on arrival
 */
function BrandEnergyTrail({ triggerStart, targetSelector, onImpact }) {
    const [isActive, setIsActive] = useState(false);
    const [orbStyle, setOrbStyle] = useState({});
    const [particles, setParticles] = useState([]);

    // Animation refs
    const requestRef = useRef();
    const startTimeRef = useRef();
    const particlesRef = useRef([]); // Keep track without re-renders for physics
    const nextParticleTime = useRef(0);

    // Config
    const ANIMATION_DURATION = 2400; // ms

    useEffect(() => {
        if (!triggerStart) return;

        // Find target
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            console.warn("BrandEnergyTrail: Target not found", targetSelector);
            return;
        }

        const startAnimation = () => {
            const targetRect = targetElement.getBoundingClientRect();

            // Start Position: Bottom Leftish (20% width, 90% height)
            const startX = window.innerWidth * 0.2;
            const startY = window.innerHeight * 0.9;

            // End Position: Center of logo
            const endX = targetRect.left + (targetRect.width / 2);
            const endY = targetRect.top + (targetRect.height / 2);

            // Control Point for Curve (Wide arc)
            // If starting left and ending top-left, arc outwards
            const controlX = window.innerWidth * 0.5; // Arc towards center
            const controlY = window.innerHeight * 0.4; // Arc upwards

            setIsActive(true);
            startTimeRef.current = performance.now();

            const animate = (time) => {
                const elapsed = time - startTimeRef.current;
                const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

                // Ease In Out Cubic
                const ease = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                // Quadratic Bezier Curve
                // P = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
                const t = ease;
                const invT = 1 - t;

                const currentX = (invT * invT * startX) + (2 * invT * t * controlX) + (t * t * endX);
                const currentY = (invT * invT * startY) + (2 * invT * t * controlY) + (t * t * endY);

                setOrbStyle({
                    transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
                    opacity: 1 // Keep full opacity until impact
                });

                // Spawn Particles (Gold Stars)
                if (progress < 0.95 && time > nextParticleTime.current) {
                    const id = Date.now() + Math.random();
                    const size = 4 + Math.random() * 6; // 4-10px

                    const newParticle = {
                        id,
                        x: currentX,
                        y: currentY,
                        size,
                        life: 1.0,
                        rotation: Math.random() * 360,
                        velocity: {
                            x: (Math.random() - 0.5) * 2, // Slight drift
                            y: (Math.random() - 0.5) * 2
                        }
                    };

                    particlesRef.current.push(newParticle);
                    // Spawn rate: faster at middle, slower at ends
                    nextParticleTime.current = time + (40 + Math.random() * 40);
                }

                // Update Particles
                particlesRef.current = particlesRef.current.filter(p => p.life > 0).map(p => ({
                    ...p,
                    x: p.x + p.velocity.x,
                    y: p.y + p.velocity.y,
                    life: p.life - 0.02, // Decay
                    rotation: p.rotation + 2
                }));

                // Sync React State for rendering particles
                setParticles([...particlesRef.current]);

                if (progress < 1) {
                    requestRef.current = requestAnimationFrame(animate);
                } else {
                    // Complete
                    if (onImpact) onImpact();
                    setIsActive(false);
                    setParticles([]); // Clear particles or let them fade? Let's clear for cleanup
                }
            };

            requestRef.current = requestAnimationFrame(animate);
        };

        // Small delay to ensure layout is stable
        const timer = setTimeout(startAnimation, 100);

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(requestRef.current);
        };
    }, [triggerStart, targetSelector, onImpact]);

    if (!isActive && particles.length === 0) return null;

    return (
        <div className="brand-energy-container">
            {/* The Orb */}
            {isActive && (
                <div className="energy-orb" style={orbStyle}>
                    <div className="orb-core" />
                    <div className="orb-glow" />
                </div>
            )}

            {/* The Trail Particles */}
            {particles.map(p => (
                <div
                    key={p.id}
                    className="gold-star-particle"
                    style={{
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        opacity: p.life,
                        transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                </div>
            ))}
        </div>
    );
}

export default BrandEnergyTrail;
