import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Timeline } from "./ui/timeline";
import "./WeRrcmJourney.css";

export default function WeRrcmJourney() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });

  const checkpoints = [
    {
      id: "01",
      title: "Foundations of Robotics",
      desc: "Electronics basics, components, and problem-solving mindset",
      left: "8%",
      position: "bottom"
    },
    {
      id: "02",
      title: "Sensors & Coding",
      desc: "Arduino programming, sensor intelligence, and logic building",
      left: "27%",
      position: "top"
    },
    {
      id: "03",
      title: "Motors & Actuators",
      desc: "Motion control, mechanics, and real-world movement systems",
      left: "50%",
      position: "bottom"
    },
    {
      id: "04",
      title: "Complete Robot Build",
      desc: "End-to-end robot assembly, testing, and optimization",
      left: "73%",
      position: "top"
    },
    {
      id: "05",
      title: "Competition Ready",
      desc: "Advanced challenges, teamwork, and performance tuning",
      left: "92%",
      position: "bottom"
    }
  ];

  const timelineData = [
    {
      title: "Foundations",
      content: (
        <div>
          <p className="timeline-text">
            Master the fundamentals of robotics with hands-on electronics basics, component understanding, and develop a problem-solving mindset.
          </p>
          <ul className="timeline-list">
            <li>✓ Electronics fundamentals</li>
            <li>✓ Component identification</li>
            <li>✓ Circuit basics</li>
            <li>✓ Problem-solving techniques</li>
          </ul>
        </div>
      )
    },
    {
      title: "Sensors & Programming",
      content: (
        <div>
          <p className="timeline-text">
            Learn Arduino programming and sensor integration to build intelligent systems that can perceive and respond to their environment.
          </p>
          <ul className="timeline-list">
            <li>✓ Arduino programming</li>
            <li>✓ Sensor integration</li>
            <li>✓ Logic building</li>
            <li>✓ Data processing</li>
          </ul>
        </div>
      )
    },
    {
      title: "Motors & Motion",
      content: (
        <div>
          <p className="timeline-text">
            Control motion with motors and actuators, understanding mechanics and real-world movement systems for dynamic robotics.
          </p>
          <ul className="timeline-list">
            <li>✓ Motor control</li>
            <li>✓ Mechanical systems</li>
            <li>✓ Movement optimization</li>
            <li>✓ Power management</li>
          </ul>
        </div>
      )
    },
    {
      title: "Robot Assembly",
      content: (
        <div>
          <p className="timeline-text">
            Bring it all together with end-to-end robot assembly, comprehensive testing, and performance optimization for real-world applications.
          </p>
          <ul className="timeline-list">
            <li>✓ Full assembly</li>
            <li>✓ System integration</li>
            <li>✓ Testing protocols</li>
            <li>✓ Performance tuning</li>
          </ul>
        </div>
      )
    },
    {
      title: "Competition Ready",
      content: (
        <div>
          <p className="timeline-text">
            Advance to competition-level challenges, develop teamwork skills, and fine-tune your robot for peak performance in real competitions.
          </p>
          <ul className="timeline-list">
            <li>✓ Advanced challenges</li>
            <li>✓ Team collaboration</li>
            <li>✓ Competition strategies</li>
            <li>✓ Performance excellence</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="journey-curved section-parallax">
      {/* HEADER */}
      <div className="journey-header">
        <span className="journey-eyebrow">LEARNING ROADMAP</span>
        <h2
          ref={titleRef}
          className={`journey-title scroll-reveal ${
            titleVisible ? "visible" : ""
          }`}
        >
          Your Robotics Learning Journey
        </h2>
        <p>
          A carefully designed, milestone-driven path that transforms curiosity
          into competition-ready robotics expertise.
        </p>
      </div>

      {/* FULL WIDTH CURVED ROAD */}
      <div className="curved-road-wrapper">
        <svg
          className="curved-road"
          viewBox="0 0 1600 500"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(37,99,235,0.6)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0.1)" />
            </linearGradient>
          </defs>
          
          {/* Main wave path */}
          <path
            className="wave-path"
            d="
              M 0 300
              C 150 80, 300 520, 450 300
              C 600 80, 750 520, 900 300
              C 1050 80, 1200 520, 1350 300
              C 1450 200, 1550 400, 1600 300
            "
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Accent wave */}
          <path
            className="wave-accent"
            d="
              M 0 300
              C 150 80, 300 520, 450 300
              C 600 80, 750 520, 900 300
              C 1050 80, 1200 520, 1350 300
              C 1450 200, 1550 400, 1600 300
            "
            fill="none"
            stroke="rgba(37,99,235,0.8)"
            strokeWidth="2"
            strokeDasharray="8,4"
            strokeLinecap="round"
          />
        </svg>

        {/* CHECKPOINTS */}
        {checkpoints.map((step, index) => (
          <div
            key={step.id}
            className={`road-checkpoint ${step.position} scroll-reveal stagger-${
              index + 1
            } ${sectionVisible ? "visible" : ""}`}
            style={{ left: step.left, animationDelay: `${index * 0.15}s` }}
          >
            <div className="checkpoint-dot">{step.id}</div>

            <div className="checkpoint-card card-premium glass-premium">
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TIMELINE SECTION */}
      <div className="timeline-section">
        <h3 className="timeline-section-title">Detailed Learning Path</h3>
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
