import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './InsightsPage.css';

function InsightsPage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Load images optimized as webp with clean naming convention
        const totalImages = 54;

        // Helper to generate realistic-looking data
        const getCardData = (index) => {
            const types = ['Workshop', 'Competition', 'Seminar', 'Lab Session', 'Exhibition'];
            const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Online', 'Pune'];
            const titles = [
                'Future Innovators', 'Robotics Excellence', 'AI in Action', 'STEM Leadership',
                'Tech Showcase', 'Hands-on Learning', 'Creative Coding', 'Engineering Minds'
            ];

            return {
                title: titles[index % titles.length],
                type: types[index % types.length],
                location: locations[index % locations.length],
                date: `202${4 + (index % 2)}`, // 2024 or 2025
                impact: 'Empowering the next generation of tech leaders.'
            };
        };

        // Generate list of 54 cards with custom order: 47-54 first, then 1-46
        const prioritizedIds = Array.from({ length: 8 }, (_, i) => 47 + i); // 47 to 54
        const standardIds = Array.from({ length: 46 }, (_, i) => i + 1);    // 1 to 46
        const orderedIds = [...prioritizedIds, ...standardIds];

        const imageData = orderedIds.map((imgId, index) => {
            const data = getCardData(index);
            return {
                id: imgId, // Keep unique ID based on image number
                src: `/assets/insights/insight-${String(imgId).padStart(2, '0')}.webp`,
                title: data.title,
                meta: `${data.type} · ${data.location} · ${data.date}`,
                impact: data.impact
            };
        });

        setImages(imageData);
    }, []);

    return (
        <div className="insights-page">
            <Navbar />

            <main className="insights-main">
                <div className="insights-container">
                    {/* Page Header */}
                    <header className="insights-header">
                        <h1 className="insights-title">
                            Our <span className="highlight">Insights</span>
                        </h1>
                        <p className="insights-subtitle">
                            Explore moments of innovation, creativity, and learning from our robotics journey
                        </p>
                    </header>

                    {/* Cards Grid */}
                    <div className="insights-grid">
                        {images.map((image, index) => (
                            <div
                                key={image.id}
                                className="insight-card"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="card-image-wrapper">
                                    <img
                                        src={image.src}
                                        alt={image.title}
                                        className="card-image"
                                        loading="lazy"
                                    />
                                    <div className="card-overlay">
                                        <div className="card-content">
                                            <h3 className="card-title">{image.title}</h3>
                                            <p className="card-meta">{image.meta}</p>
                                            <p className="card-impact">{image.impact}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default InsightsPage;
