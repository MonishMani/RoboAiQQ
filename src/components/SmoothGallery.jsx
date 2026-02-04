import { useRef } from "react";
import "./SmoothGallery.css";

export default function SmoothGallery({ items = [] }) {
  const trackRef = useRef();

  // Default items if none provided
  const defaultItems = [
    { image: 'https://picsum.photos/seed/1/800/600?grayscale', text: 'Bridge' },
    { image: 'https://picsum.photos/seed/2/800/600?grayscale', text: 'Desk Setup' },
    { image: 'https://picsum.photos/seed/3/800/600?grayscale', text: 'Waterfall' },
    { image: 'https://picsum.photos/seed/4/800/600?grayscale', text: 'Strawberries' },
    { image: 'https://picsum.photos/seed/5/800/600?grayscale', text: 'Deep Diving' },
    { image: 'https://picsum.photos/seed/16/800/600?grayscale', text: 'Train Track' },
    { image: 'https://picsum.photos/seed/17/800/600?grayscale', text: 'Santorini' },
    { image: 'https://picsum.photos/seed/8/800/600?grayscale', text: 'Blurry Lights' },
  ];

  const galleryItems = items && items.length ? items : defaultItems;
  // Duplicate items for seamless loop
  const duplicatedItems = [...galleryItems, ...galleryItems];

  return (
    <div className="gallery-wrapper">
      <div className="gallery-track" ref={trackRef}>
        {duplicatedItems.map((item, i) => (
          <div className="gallery-card" key={i}>
            <img src={item.image} alt={item.text} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
