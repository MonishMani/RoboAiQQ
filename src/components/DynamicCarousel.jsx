import { useEffect, useRef } from "react";
import "./DynamicCarousel.css";

export default function DynamicCarousel({ items = [] }) {
  const trackRef = useRef();
  const animationFrameRef = useRef(null);

  // Default items if none provided
  const defaultItems = [
    { image: 'https://picsum.photos/seed/1/800/600?grayscale', text: 'Innovation' },
    { image: 'https://picsum.photos/seed/2/800/600?grayscale', text: 'Leadership' },
    { image: 'https://picsum.photos/seed/3/800/600?grayscale', text: 'Excellence' },
    { image: 'https://picsum.photos/seed/4/800/600?grayscale', text: 'Teamwork' },
    { image: 'https://picsum.photos/seed/5/800/600?grayscale', text: 'Success' },
    { image: 'https://picsum.photos/seed/6/800/600?grayscale', text: 'Growth' },
    { image: 'https://picsum.photos/seed/7/800/600?grayscale', text: 'Vision' },
  ];

  const carouselItems = items && items.length ? items : defaultItems;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Optimized update function with requestAnimationFrame
    const updateCards = () => {
      const cards = track.querySelectorAll(".dynamic-card");
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.width / 2;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left - trackRect.left + cardRect.width / 2;
        
        // Calculate normalized distance from center (-1 to 1)
        const distance = (cardCenter - trackCenter) / trackCenter;
        
        // MAGIC FORMULAS - Tuned for smooth, premium feel
        const rotateY = distance * 45; // Curve strength
        const scale = 1 - Math.abs(distance) * 0.25; // Scale based on distance
        const z = -Math.abs(distance) * 200; // Depth effect
        const brightness = 1 - Math.abs(distance) * 0.3; // Brightness falloff
        
        // Apply transforms with GPU acceleration
        card.style.transform = `perspective(1200px) rotateY(${rotateY}deg) translateZ(${z}px) scale(${scale})`;
        card.style.filter = `brightness(${brightness})`;
        card.style.opacity = Math.max(0.5, 1 - Math.abs(distance) * 0.5);
      });
    };

    // Initial update
    updateCards();

    // Scroll event with throttling via requestAnimationFrame
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateCards);
    };

    // Resize handler
    const handleResize = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateCards);
    };

    // Event listeners
    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="dynamic-wrapper">
      <div className="dynamic-track" ref={trackRef}>
        {carouselItems.map((item, i) => (
          <div className="dynamic-card" key={i}>
            <img src={item.image} alt={item.text} loading="lazy" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
