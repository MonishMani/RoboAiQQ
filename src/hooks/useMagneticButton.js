import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for magnetic button effect
 * Buttons slightly pull toward the cursor when nearby
 * @param {Object} options - Configuration options
 * @param {number} options.strength - Magnetic pull strength (pixels)
 * @param {number} options.radius - Detection radius for magnetic effect
 * @returns {React.RefObject} - Ref to attach to the button
 */
export function useMagneticButton(options = {}) {
    const {
        strength = 15,
        radius = 100
    } = options;

    const ref = useRef(null);
    const rafRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;

        const element = ref.current;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < radius) {
            // Calculate pull strength based on distance
            const pullStrength = (1 - distance / radius) * strength;
            const moveX = (distanceX / distance) * pullStrength;
            const moveY = (distanceY / distance) * pullStrength;

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            rafRef.current = requestAnimationFrame(() => {
                element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });
        }
    }, [strength, radius]);

    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return;

        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        // Smooth reset
        ref.current.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        ref.current.style.transform = 'translate3d(0, 0, 0)';

        // Remove transition after reset
        setTimeout(() => {
            if (ref.current) {
                ref.current.style.transition = '';
            }
        }, 300);
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            return;
        }

        const element = ref.current;
        if (!element) return;

        // Listen on document for smoother effect
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (element) {
                element.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleMouseMove, handleMouseLeave]);

    return ref;
}

export default useMagneticButton;
