import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUsPage from './pages/AboutUsPage';
import RoboticsKitPage from './pages/RoboticsKitPage';
import MentorsPage from './pages/MentorsPage';
import ProgramCurriculumPage from './pages/ProgramCurriculumPage';
import InsightsPage from './pages/InsightsPage';
import RobotTest from './pages/RobotTest';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RiaChatbot from './components/RiaChatbot/RiaChatbot';
import IntroOverlay from './components/IntroOverlay'; // Import IntroOverlay
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Check session storage on initialization to prevent flash
    try {
      return !sessionStorage.getItem('hasSeenIntro');
    } catch (e) {
      return false;
    }
  });

  return (
    <div className="app">
      {/* Show IntroOverlay only if showIntro is true */}
      {showIntro && <IntroOverlay onComplete={() => setShowIntro(false)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/robotics-kit" element={<RoboticsKitPage />} />
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/programs" element={<ProgramCurriculumPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/robot-test" element={<RobotTest />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      {/* Hide Chatbot when intro is visible */}
      {!showIntro && <RiaChatbot />}
    </div>
  );
}

export default App;

