import "./CurvedCarousel.css";

export default function CurvedCarousel({ items = [] }) {
  // Default items if none provided
  const defaultItems = [
    { image: 'https://picsum.photos/seed/1/800/600?grayscale', text: 'Innovation' },
    { image: 'https://picsum.photos/seed/2/800/600?grayscale', text: 'Leadership' },
    { image: 'https://picsum.photos/seed/3/800/600?grayscale', text: 'Excellence' },
    { image: 'https://picsum.photos/seed/4/800/600?grayscale', text: 'Teamwork' },
    { image: 'https://picsum.photos/seed/5/800/600?grayscale', text: 'Success' },
  ];

  const carouselItems = items && items.length ? items : defaultItems;

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track">
        {carouselItems.map((item, index) => (
          <div className="carousel-card" key={index}>
            <img src={item.image} alt={item.text} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
