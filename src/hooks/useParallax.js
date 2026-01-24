import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for parallax scrolling effects
 * Uses requestAnimationFrame for smooth 60fps performance
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Parallax speed factor (0-1, lower = slower)
 * @param {string} options.direction - 'vertical' or 'horizontal'
 * @returns {[React.RefObject, Object]} - Ref and current transform values
 */
export function useParallax(options = {}) {
    const {
        speed = 0.3,
        direction = 'vertical'
    } = options;

    const ref = useRef(null);
    const rafRef = useRef(null);
    const lastScrollY = useRef(0);

    const updateParallax = useCallback(() => {
        if (!ref.current) return;

        const element = ref.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Only animate when element is in view
        if (rect.bottom < 0 || rect.top > windowHeight) {
            return;
        }

        // Calculate scroll progress relative to element
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const offset = (scrollProgress - 0.5) * 100 * speed;

        if (direction === 'vertical') {
            element.style.transform = `translate3d(0, ${offset}px, 0)`;
        } else {
            element.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
    }, [speed, direction]);

    const onScroll = useCallback(() => {
        // Throttle with RAF for 60fps
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            updateParallax();
            lastScrollY.current = window.scrollY;
        });
    }, [updateParallax]);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            return;
        }

        // Initial calculation
        updateParallax();

        // Add scroll listener with passive flag for performance
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [onScroll, updateParallax]);

    return ref;
}

/**
 * Hook for parallax background layers
 * Multiple layers move at different speeds
 * @param {Array<number>} speeds - Array of speed values for each layer
 * @returns {Array<React.RefObject>} - Array of refs for each layer
 */
export function useParallaxLayers(speeds = [0.2, 0.4, 0.6]) {
    const refs = useRef([]);
    const rafRef = useRef(null);

    const updateLayers = useCallback(() => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        refs.current.forEach((element, index) => {
            if (!element) return;

            const rect = element.getBoundingClientRect();

            // Only animate when parent is in view
            if (rect.bottom < -100 || rect.top > windowHeight + 100) {
                return;
            }

            const speed = speeds[index] || 0.3;
            const offset = scrollY * speed * -0.5;

            element.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
    }, [speeds]);

    const onScroll = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(updateLayers);
    }, [updateLayers]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            return;
        }

        updateLayers();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [onScroll, updateLayers]);

    const setRef = (index) => (el) => {
        refs.current[index] = el;
    };

    return speeds.map((_, index) => setRef(index));
}

export default useParallax;
