import React from 'react';
import './WeRrcmMentors.css';
import SplitText from './SplitText';
import TextType from './TextType';

const mentorNarsing = "/assets/mentors/mentor-narsing.png";
const mentorTamizharasan = "/assets/mentors/mentor-tamizharasan.png";
const mentorSarah = "/assets/mentors/mentor-sarah.png";
const mentorMike = "/assets/mentors/mentor-mike.png";
const mentorAlex = "/assets/mentors/mentor-alex.png";
const mentorJordan = "/assets/mentors/mentor-jordan.png";

function WeRrcmMentors() {
  const mentors = [
    {
      image: mentorNarsing,
      title: 'Narsing Chappe',
      subtitle: 'Robotics & Mathematics Specialist',
      handle: 'IIT Bombay',
      borderColor: '#ff9933',
      gradient: 'linear-gradient(145deg, #ff9933, #000)',
      url: 'https://github.com/',
      featured: true,
      expertise: [
        { icon: '●', title: 'Robotics Mentor', desc: 'Competition preparation' },
        { icon: '●', title: 'Mathematics Expert', desc: 'Applied mathematics' },

      ]
    },
    {
      image: mentorTamizharasan,
      title: 'Tamizharasan K',
      subtitle: 'Robotics & Programming Specialist',
      handle: 'Robotics Expert',
      borderColor: '#3B82F6',
      gradient: 'linear-gradient(180deg, #3B82F6, #000)',
      url: 'https://linkedin.com/',
      expertise: [
        { icon: '●', title: 'Robotics Training', desc: 'Hands-on robotics projects' },
        { icon: '●', title: 'Programming Expert', desc: 'Arduino & embedded systems' },

      ]
    },
    {
      image: mentorSarah,
      title: 'Sarah Johnson',
      subtitle: 'AI & Computer Vision Specialist',
      handle: 'AI Research Mentor',
      borderColor: '#10B981',
      gradient: 'linear-gradient(145deg, #10B981, #000)',
      url: 'https://github.com/',
      expertise: [
        { icon: '●', title: 'Lead Robotics Instructor', desc: '15+ years in robotics education' },
        { icon: '●', title: 'Research Mentor', desc: 'Computer vision & AI systems' },

      ]
    },
    {
      image: mentorMike,
      title: 'Mike Chen',
      subtitle: 'Embedded Systems Architect',
      handle: 'Industry Practitioner',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(180deg, #8B5CF6, #000)',
      url: 'https://linkedin.com/',
      expertise: [
        { icon: '●', title: 'Arduino Programming Expert', desc: '10+ years teaching experience' },
        { icon: '●', title: 'Competition Mentor', desc: 'International competition mentor' },

      ]
    },
    {
      image: mentorAlex,
      title: 'Alex Rivera',
      subtitle: 'Mechatronics Engineer',
      handle: 'Product & Systems',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(145deg, #F59E0B, #000)',
      url: 'https://github.com/',
      expertise: [
        { icon: '●', title: 'Competition Coach', desc: 'Coached 50+ winning teams' },
        { icon: '●', title: 'Electronics Specialist', desc: '8 years competition experience' },

      ]
    }
  ];

  const featuredMentor = mentors.find(m => m.featured);
  const otherMentors = mentors.filter(m => !m.featured);

  const topMentors = [mentors[0], mentors[1]];
  const bottomMentors = mentors.slice(2);

  const MentorCard = ({ mentor, isFeatured = false }) => (
    <div className={`mentor-card ${isFeatured ? 'mentor-card--featured' : ''}`}>
      <div className="mentor-card-inner">
        <div
          className="mentor-card-image"
          style={{
            backgroundImage: `url(${mentor.image})`,
            borderColor: mentor.borderColor
          }}
        >
          <div className="mentor-name-badge">{mentor.title}</div>
          <div className="mentor-card-overlay">
            <div className="mentor-info">
              <h3>{mentor.title}</h3>
              <p className="mentor-subtitle">{mentor.subtitle}</p>
              <p className="mentor-handle">{mentor.handle}</p>

              <div className="mentor-expertise">
                {mentor.expertise.map((exp, idx) => (
                  <div key={idx} className="expertise-item">
                    <span className="expertise-icon">{exp.icon}</span>
                    <div className="expertise-text">
                      <p className="expertise-title">{exp.title}</p>
                      <p className="expertise-desc">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="wrrcm-mentors">
      <div className="container">
        {/* Badge */}
        <span className="mentors-badge">EXPERT MENTORS</span>

        {/* Heading */}
        <h2>
          Learn from <span className="keyword-highlight">Industry-Leading Robotics Mentors</span>
        </h2>

        {/* Subtitle */}
        <TextType
          text="Our mentors are engineers, researchers, and educators who bring real-world robotics experience into every learning session."
          className="mentors-subtitle"
          typingSpeed={35}
          deletingSpeed={20}
          pauseDuration={3000}
          loop={true}
          showCursor={true}
          cursorCharacter="|"
          cursorBlinkDuration={0.6}
        />

        {/* Trust Metrics */}
        <div className="mentors-stats">
          <div>
            <strong>10+</strong>
            <span>Expert Mentors</span>
          </div>
          <div>
            <strong>8+ Years</strong>
            <span>Avg. Experience</span>
          </div>
          <div>
            <strong>Global</strong>
            <span>Industry Exposure</span>
          </div>
          <div>
            <strong>1000+</strong>
            <span>Students Mentored</span>
          </div>
        </div>

        <h3>Meet Our <span className="keyword-highlight">Expert Mentors</span></h3>
        <p className="mentors-subtitle">Learn from industry professionals with real-world experience</p>

        {/* Unique Mentor Grid */}
        <div className="mentors-grid-container">
          {/* Top 2 Cards */}
          <div className="mentors-grid-top">
            {topMentors.map((mentor, index) => (
              <MentorCard key={index} mentor={mentor} />
            ))}
          </div>
          <h4>Meet Our <span className="keyword-highlight">Expert Instructors</span></h4>
          <div className="mentors-grid-bottom">
            {bottomMentors.map((mentor, index) => (
              <MentorCard key={index} mentor={mentor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeRrcmMentors;
