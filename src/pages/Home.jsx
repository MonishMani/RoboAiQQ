import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import IntroVideo from '../components/IntroVideo';
import WeRrcmUnique from '../components/WeRrcmUnique';
import WeRrcmJourney from '../components/WeRrcmJourney';
import SuccessStories from '../components/SuccessStories';
// import WeRrcmMentors from '../components/WeRrcmMentors';
import WeRrcmTestimonials from '../components/WeRrcmTestimonials';
import GallerySection from '../components/GallerySection';
import WeRrcmContactForm from '../components/WeRrcmContactForm';
import Footer from '../components/Footer';

function Home() {
    const [introComplete, setIntroComplete] = useState(false);
    const [logoPosition, setLogoPosition] = useState(null);

    useEffect(() => {
        // Function to find logo and get its position
        const updateLogoPosition = () => {
            // Since the navbar is rendered but hidden (opacity 0), we can find the element
            const logoElement = document.getElementById('brand-logo-target');
            if (logoElement) {
                const rect = logoElement.getBoundingClientRect();
                setLogoPosition({
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                });
            }
        };

        // Check for position on mount and on resize
        // We might need a slight delay to ensure render is complete
        const timer = setTimeout(updateLogoPosition, 100);

        window.addEventListener('resize', updateLogoPosition);

        // Prevent scrolling during intro
        if (!introComplete) {
            document.body.classList.add('intro-playing');
        } else {
            document.body.classList.remove('intro-playing');
        }

        return () => {
            window.removeEventListener('resize', updateLogoPosition);
            document.body.classList.remove('intro-playing');
            clearTimeout(timer);
        };
    }, [introComplete]);

    const handleIntroComplete = () => {
        setIntroComplete(true);
    };

    return (
        <>
            {!introComplete && (
                <IntroVideo
                    onComplete={handleIntroComplete}
                    targetPosition={logoPosition}
                />
            )}

            <div
                className="main-website-content"
                style={{
                    opacity: introComplete ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out'
                }}
            >
                <Navbar />
                <HeroSection />
                <WeRrcmUnique />
                <WeRrcmJourney />
                <SuccessStories />
                {/* WeRrcmMentors moved to its own page */}
                <WeRrcmTestimonials />
                <GallerySection />
                {/* RoboKitSection moved to its own page */}
                <WeRrcmContactForm />
                <Footer />
            </div>
        </>
    );
}

export default Home;

