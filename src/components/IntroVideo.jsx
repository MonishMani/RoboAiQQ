import { useState, useEffect } from 'react';
import './IntroVideo.css';

function IntroVideo({ onComplete }) {
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleVideoEnd = () => {
        // Start fade-out animation
        setIsFadingOut(true);

        // Notify parent component to start fading in website
        if (onComplete) {
            onComplete();
        }

        // Remove video from DOM after fade completes
        setTimeout(() => {
            const container = document.querySelector('.intro-video-container');
            if (container) {
                container.remove();
            }
        }, 800);
    };

    return (
        <div className={`intro-video-container ${isFadingOut ? 'fade-out' : ''}`}>
            <video
                className="intro-video"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
            >
                <source src="/assets/videos/robo-aiq-hero-final.mp4" type="video/mp4" />
            </video>

            {/* Optional gradient overlay for smooth blend */}
            <div className="intro-video-blend"></div>
        </div>
    );
}

export default IntroVideo;
