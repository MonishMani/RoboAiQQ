import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import RoadmapSection from './components/RoadmapSection';
import TestimonialSection from './components/TestimonialSection';
import ContactSection from './components/ContactSection';
import WeRrcmUnique from './components/WeRrcmUnique';
import WeRrcmMentors from './components/WeRrcmMentors';
import WeRrcmTestimonials from './components/WeRrcmTestimonials';
import GallerySection from './components/GallerySection';
import WeRrcmCurriculum from './components/WeRrcmCurriculum';
import WeRrcmContactForm from './components/WeRrcmContactForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <WeRrcmUnique />
      <WeRrcmMentors />
      <WeRrcmTestimonials />
      <GallerySection />
      <WeRrcmCurriculum />
      <WeRrcmContactForm />
    </div>
  );
}

export default App;
