import React, { useEffect, useState } from 'react';

const IntroOverlay = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Check session storage
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
        if (!hasSeenIntro) {
            setIsVisible(true);
        }

        const handleMessage = (event) => {
            // In production, you might want to check event.origin
            if (event.data && event.data.type === 'introComplete') {
                handleIntroComplete();
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleIntroComplete = () => {
        setIsFading(true);
        sessionStorage.setItem('hasSeenIntro', 'true');

        // Remove from DOM after fade animation
        setTimeout(() => {
            setIsVisible(false);
        }, 1000); // Match transition duration
    };

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                opacity: isFading ? 0 : 1,
                transition: 'opacity 1s ease-in-out',
                pointerEvents: isFading ? 'none' : 'auto',
                backgroundColor: '#FFFFF0' // Match Intro background to prevent flash
            }}
        >
            <iframe
                src="/intro.html"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                }}
                title="RoboAiQ Intro"
            />
        </div>
    );
};

export default IntroOverlay;
