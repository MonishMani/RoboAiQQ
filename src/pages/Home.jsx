import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import IntroVideo from '../components/IntroVideo';
import WeRrcmUnique from '../components/WeRrcmUnique';
import WeRrcmJourney from '../components/WeRrcmJourney';
import WeRrcmCurriculum from '../components/WeRrcmCurriculum';
import SuccessStories from '../components/SuccessStories';
// import WeRrcmMentors from '../components/WeRrcmMentors';
import WeRrcmTestimonials from '../components/WeRrcmTestimonials';
import GallerySection from '../components/GallerySection';
import WeRrcmContactForm from '../components/WeRrcmContactForm';
import Footer from '../components/Footer';

function Home() {
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        // Prevent scrolling during intro
        if (!introComplete) {
            document.body.classList.add('intro-playing');
        } else {
            document.body.classList.remove('intro-playing');
        }

        return () => {
            document.body.classList.remove('intro-playing');
        };
    }, [introComplete]);

    const handleIntroComplete = () => {
        setIntroComplete(true);
    };

    return (
        <>
            {!introComplete && <IntroVideo onComplete={handleIntroComplete} />}

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
                <WeRrcmCurriculum />
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

