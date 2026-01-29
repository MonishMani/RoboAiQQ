import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ProgramsPage.css';
import { useState } from 'react';
import { FaRobot, FaMicroscope, FaRocket, FaTrophy, FaCheckCircle } from 'react-icons/fa';

function ProgramCurriculumPage() {
  const [activeProgram, setActiveProgram] = useState(1);

  const programs = [
    {
      id: 1,
      title: 'Robotics & AI Program',
      icon: FaRobot,
      color: '#FF1E1E',
      description: 'Master advanced robotics and artificial intelligence with hands-on engineering experience.',
      highlights: ['Next-generation AI curriculum', 'State-of-the-art robotics labs', 'Real-world problem solving', 'Industry-standard tools and platforms'],
      details: 'Comprehensive training in robotics engineering, machine learning, and AI applications with hands-on projects.'
    },
    {
      id: 2,
      title: 'STEM Leadership Program',
      icon: FaMicroscope,
      color: '#7DB3E8',
      description: 'Develop scientific thinking combined with leadership excellence and strategic decision-making.',
      highlights: ['Integrated STEM learning', 'Leadership development', 'Critical thinking mastery', 'Research and innovation focus'],
      details: 'Integrated science, technology, engineering, and mathematics with leadership and strategic thinking.'
    },
    {
      id: 3,
      title: 'Startup & Entrepreneurship',
      icon: FaRocket,
      color: '#FFB84D',
      description: 'Learn to think like founders—building innovation mindset and execution excellence.',
      highlights: ['Founder mindset training', 'Business model development', 'Innovation workshops', 'Mentorship from entrepreneurs'],
      details: 'Build your own startup ideas with mentorship from successful entrepreneurs and industry leaders.'
    },
    {
      id: 4,
      title: 'Competition Training',
      icon: FaTrophy,
      color: '#10B981',
      description: 'Compete at the highest levels—national and international robotics championships.',
      highlights: ['Competition-ready training', 'Global robotics leagues', 'Championship preparation', 'Team excellence building'],
      details: 'Elite training for national and international robotics competitions with championship-winning strategies.'
    },
  ];

  const features = [
    { title: 'Advanced Curriculum', description: 'Next-generation robotics and AI curriculum aligned with global technology standards.' },
    { title: 'State-of-the-Art Labs', description: 'Training in world-class robotics laboratories with cutting-edge equipment and platforms.' },
    { title: 'Hybrid Learning Model', description: 'Flexible in-person and online mentorship combining elite lab sessions with digital access.' },
    { title: '1:1 Personalized Focus', description: 'Individual attention, mentorship, and performance tracking for every student.' },
    { title: 'Global Competitions', description: 'Exclusive access to national and international robotics leagues and championships.' },
    { title: 'Tech Ecosystem Access', description: 'Strategic exposure to India\'s top tech institutions including IIT Mumbai, Delhi, and Madras.' },
    { title: 'Entrepreneurial Mindset', description: 'Training to think like founders with focus on innovation, decision-making, and execution.' },
    { title: 'Communication Excellence', description: 'Advanced training in public speaking, presentation, and persuasive communication skills.' },
    { title: 'Real-World Application', description: 'STEM-driven approach transforming theory into practical problem-solving expertise.' },
    { title: 'Industry Exposure', description: 'Curated visits to leading tech companies and advanced robotics research centers.' },
  ];

  return (
    <>
      <Navbar />
      <div className="programs-page">
        {/* HERO SECTION */}
        <section className="programs-hero">
          <div className="hero-content">
            <div className="hero-badge">RoboAIQ is not a hobby class.</div>
            <h1 className="hero-title">
              RoboAIQ — An <span className="highlight">Elite Future-Tech Leadership Program</span>
            </h1>
            <p className="hero-subtitle">
              It is a high-impact future leadership program for exceptional young minds.
            </p>
            <p className="hero-subtitle hero-subtitle-secondary">
              Designed for parents who demand more than ordinary education, RoboAIQ blends advanced robotics, artificial intelligence, leadership, and entrepreneurial thinking to prepare children for the highest levels of global success.
            </p>
          </div>
          <div className="hero-decoration">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
          </div>
        </section>

        {/* PROGRAMS SHOWCASE */}
        <section className="programs-showcase">
          <div className="showcase-container">
            <div className="showcase-header">
              <h2>RoboAIQ <span className="highlight">Programs</span></h2>
              <p>Choose the program that matches your child's passion and potential</p>
            </div>

            <div className="programs-grid">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className={`program-card ${activeProgram === program.id ? 'active' : ''}`}
                  onClick={() => setActiveProgram(program.id)}
                  style={{ '--accent-color': program.color }}
                >
                  <div className="card-top">
                    <div className="card-icon" style={{ color: program.color }}>
                      <program.icon />
                    </div>
                    <h3>{program.title}</h3>
                  </div>
                  <p className="card-description">{program.description}</p>
                  <div className="card-highlights">
                    {program.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="highlight-item">
                        <FaCheckCircle style={{ color: program.color }} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="programs-features">
          <div className="features-container">
            <div className="features-header">
              <h2>What Makes Us Exceptional</h2>
              <p>Comprehensive program architecture delivering world-class education</p>
            </div>

            <div className="features-grid" id='programe'>
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-number">{String(index + 1).padStart(2, '0')}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       
        
      </div>
      <Footer />
    </>
  );
}

export default ProgramCurriculumPage;
