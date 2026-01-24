import { useState, useEffect } from 'react';
import './IntroVideo.css';

function IntroVideo({ onComplete, targetPosition }) {
    const [isDocking, setIsDocking] = useState(false);
    const [dockStyle, setDockStyle] = useState({});

    const handleVideoEnd = () => {
        // Calculate docking transform if target position is available
        if (targetPosition) {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const scaleX = targetPosition.width / windowWidth;
            const scaleY = targetPosition.height / windowHeight;
            // Use the larger scale to ensure cover fit, or smaller to fit inside?
            // User said "Scale down to the exact size of the logo container". 
            // Logo container is small. Video is 16:9 usually. Logo is rect.
            // Let's use width ratio for scale to match width, or larger of the two to cover?
            // Logo is likely much wider than tall. 
            // Let's scale to match the height usually for a logo docking effect, or standard scale.
            // Simple scale logic:
            const scale = targetPosition.height / windowHeight; // Match height mostly

            // Calculate translation
            // Origin is top-left (0,0). Target is targetPosition.left, targetPosition.top
            const translateX = targetPosition.left;
            const translateY = targetPosition.top;

            setDockStyle({
                transform: `translate(${translateX}px, ${translateY}px) scale(${targetPosition.width / windowWidth}, ${targetPosition.height / windowHeight})`,
                // We use separate scales for X and Y to force it into the box, though it might squish.
                // Or we can use `width` and `height` transition instead of transform scale for exact fit.
                // Transform is smoother. Let's try explicit width/height transition logic if css allows.
                // Actually, transforming from 100vw/100vh to target Rect is best done via:
                // translate(x, y) and width/height change if using layout transition, 
                // OR translate + scale. 
                // Let's use Top/Left/Width/Height transition for max layout accuracy matching the container.
                top: `${targetPosition.top}px`,
                left: `${targetPosition.left}px`,
                width: `${targetPosition.width}px`,
                height: `${targetPosition.height}px`,
                opacity: 0, // Fade out as requested while moving
                borderRadius: '8px' // Optional: match button/logo radius
            });
        }

        setIsDocking(true);

        // Notify parent component to start fading in website
        if (onComplete) {
            onComplete();
        }

        // Remove video from DOM after transition
        setTimeout(() => {
            const container = document.querySelector('.intro-video-container');
            if (container) {
                container.remove();
            }
        }, 800);
    };

    return (
        <div
            className={`intro-video-container ${isDocking ? 'docking' : ''}`}
            style={isDocking ? dockStyle : {}}
        >
            <video
                className="intro-video"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
            >
                <source src="/assets/videos/robo-aiq-hero-final.mp4" type="video/mp4" />
            </video>

            {/* Watermark Mask */}
            {/* <div className="video-mask"></div> - Handled in CSS pseudo-element */}
        </div>
    );
}

export default IntroVideo;
