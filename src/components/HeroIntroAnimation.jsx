import { useEffect, useState, useCallback } from 'react';
import './HeroIntroAnimation.css';

/**
 * Premium Cinematic Hero Intro Animation - Upgraded
 * 5-phase animation: reveal → float → travel → lock-in → content reveal
 * Total duration: ~6.9 seconds (Optimized for 60fps+ velocity)
 */
function HeroIntroAnimation({ onComplete, onPhase5Start }) {
    const [phase, setPhase] = useState(1);
    const [isComplete, setIsComplete] = useState(false);

    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleAnimationComplete = useCallback(() => {
        setIsComplete(true);
        if (onComplete) onComplete();
    }, [onComplete]);

    useEffect(() => {
        // Skip animation for reduced motion
        if (prefersReducedMotion) {
            if (onPhase5Start) onPhase5Start();
            handleAnimationComplete();
            return;
        }

        // Optimized Phasing (approx -12% duration from original)
        const timings = {
            phase2: 1400,  // 0.0s → 1.4s (Cinematic Reveal)
            phase3: 2450,  // 1.4s → 2.45s (Micro-Float)
            phase4: 4050,  // 2.45s → 4.05s (Travel)
            phase5: 4500,  // 4.05s → 4.50s (Lock-in)
            complete: 6900 // 4.50s → 6.90s (Content Reveal)
        };

        const phase2Timer = setTimeout(() => setPhase(2), timings.phase2);
        const phase3Timer = setTimeout(() => setPhase(3), timings.phase3);
        const phase4Timer = setTimeout(() => setPhase(4), timings.phase4);
        const phase5Timer = setTimeout(() => {
            setPhase(5);
            if (onPhase5Start) onPhase5Start();
        }, timings.phase5);
        const completeTimer = setTimeout(handleAnimationComplete, timings.complete);

        return () => {
            clearTimeout(phase2Timer);
            clearTimeout(phase3Timer);
            clearTimeout(phase4Timer);
            clearTimeout(phase5Timer);
            clearTimeout(completeTimer);
        };
    }, [prefersReducedMotion, onPhase5Start, handleAnimationComplete]);

    // Don't render overlay after completion
    if (isComplete || prefersReducedMotion) {
        return null;
    }

    return (
        <div className={`hero-intro-overlay phase-${phase}`}>
            {/* Ambient background glow & particles */}
            <div className="intro-ambient-glow" />
            <div className="intro-particles" />

            {/* Composite logo unit */}
            <div className="intro-logo-composite">
                {/* Robot mascot - Redesigned High-Detail Structure */}
                <div className="intro-robot">
                    <div className="robot-body-group">
                        <div className="robot-head-group">
                            <div className="robot-antenna-stem" />
                            <div className="robot-antenna-tip" />
                            <div className="robot-ear left" />
                            <div className="robot-ear right" />
                            <div className="robot-face-plate">
                                <div className="robot-face-glass">
                                    <div className="robot-eye left" />
                                    <div className="robot-eye right" />
                                    <div className="robot-face-reflection" />
                                </div>
                            </div>
                        </div>

                        <div className="robot-neck" />

                        <div className="robot-torso-group">
                            <div className="robot-shoulder left" />
                            <div className="robot-shoulder right" />
                            <div className="robot-chest-plate">
                                <div className="robot-core-light" />
                                <div className="robot-panel-line top" />
                                <div className="robot-panel-line bottom" />
                            </div>
                            <div className="robot-arm left" />
                            <div className="robot-arm right" />
                        </div>

                        <div className="robot-hover-rings" />
                    </div>
                </div>

                {/* Brand text - Upgraded Typography */}
                <div className="intro-brand-text">
                    <span className="brand-robo">Robo</span>
                    <span className="brand-ai">Ai</span>
                    <span className="brand-q">Q</span>
                    <div className="text-light-sweep" />
                    <div className="text-shimmer" />
                </div>
            </div>
        </div>
    );
}

export default HeroIntroAnimation;
