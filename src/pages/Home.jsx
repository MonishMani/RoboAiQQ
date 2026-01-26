import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BenefitsSection from '../components/BenefitsSection';
import WeRrcmUnique from '../components/WeRrcmUnique';
import WeRrcmJourney from '../components/WeRrcmJourney';
import SuccessStories from '../components/SuccessStories';
// import WeRrcmMentors from '../components/WeRrcmMentors';
import WeRrcmTestimonials from '../components/WeRrcmTestimonials';
import GallerySection from '../components/GallerySection';
import WeRrcmContactForm from '../components/WeRrcmContactForm';
import Footer from '../components/Footer';

function Home() {
    return (
        <>
            <div className="main-website-content">
                <Navbar />
                <HeroSection />
                <BenefitsSection />
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

