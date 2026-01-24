import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for early/late triggering
 * @param {boolean} options.once - If true, animation only triggers once
 * @returns {[React.RefObject, boolean]} - Ref to attach and visibility state
 */
export function useScrollAnimation(options = {}) {
    const {
        threshold = 0.1,
        rootMargin = '-50px 0px',
        once = true
    } = options;

    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) {
                        observer.unobserve(element);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, rootMargin, once]);

    return [ref, isVisible];
}

/**
 * Custom hook for applying scroll animations to multiple elements
 * @param {number} count - Number of elements to track
 * @param {Object} options - Same options as useScrollAnimation
 * @returns {Array} - Array of [ref, isVisible] pairs
 */
export function useScrollAnimationGroup(count, options = {}) {
    const {
        threshold = 0.1,
        rootMargin = '-50px 0px',
        once = true,
        staggerDelay = 100
    } = options;

    const refs = useRef([]);
    const [visibleStates, setVisibleStates] = useState(
        new Array(count).fill(false)
    );

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            setVisibleStates(new Array(count).fill(true));
            return;
        }

        const observers = [];

        refs.current.forEach((element, index) => {
            if (!element) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        // Stagger the visibility with delay
                        setTimeout(() => {
                            setVisibleStates(prev => {
                                const newStates = [...prev];
                                newStates[index] = true;
                                return newStates;
                            });
                        }, index * staggerDelay);

                        if (once) {
                            observer.unobserve(element);
                        }
                    } else if (!once) {
                        setVisibleStates(prev => {
                            const newStates = [...prev];
                            newStates[index] = false;
                            return newStates;
                        });
                    }
                },
                { threshold, rootMargin }
            );

            observer.observe(element);
            observers.push({ observer, element });
        });

        return () => {
            observers.forEach(({ observer, element }) => {
                if (element) observer.unobserve(element);
            });
        };
    }, [count, threshold, rootMargin, once, staggerDelay]);

    const setRef = (index) => (el) => {
        refs.current[index] = el;
    };

    return visibleStates.map((isVisible, index) => [setRef(index), isVisible]);
}

export default useScrollAnimation;
