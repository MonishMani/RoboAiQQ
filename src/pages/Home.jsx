import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import WeRrcmUnique from '../components/WeRrcmUnique';
import WeRrcmJourney from '../components/WeRrcmJourney';
import WeRrcmCurriculum from '../components/WeRrcmCurriculum';
import SuccessStories from '../components/SuccessStories';
import WeRrcmMentors from '../components/WeRrcmMentors';
import WeRrcmTestimonials from '../components/WeRrcmTestimonials';
import GallerySection from '../components/GallerySection';
import WeRrcmContactForm from '../components/WeRrcmContactForm';
import Footer from '../components/Footer';

function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <WeRrcmUnique />
            <WeRrcmJourney />
            <WeRrcmCurriculum />
            <SuccessStories />
            <WeRrcmMentors />
            <WeRrcmTestimonials />
            <GallerySection />
            {/* RoboKitSection moved to its own page */}
            <WeRrcmContactForm />
            <Footer />
        </>
    );
}

export default Home;
