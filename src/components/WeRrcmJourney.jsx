import { useScrollAnimation } from "../hooks/useScrollAnimation";
import FeatureSteps from "./FeatureSteps";
import SplitText from "./SplitText";
import TextType from "./TextType";
import "./WeRrcmJourney.css";

export default function WeRrcmJourney() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });

  const features = [
    {
      step: "Step 1",
      title: "Foundations of Robotics",
      content: "Electronics basics, components, and problem-solving mindset",
      image: "/assets/journey1.png"
    },
    {
      step: "Step 2",
      title: "Sensors & Coding",
      content: "Arduino programming, sensor intelligence, and logic building",
      image: "/assets/journey2.png"
    },
    {
      step: "Step 3",
      title: "Motors & Actuators",
      content: "Motion control, mechanics, and real-world movement systems",
      image: "/assets/journey3.png"
    },
    {
      step: "Step 4",
      title: "Complete Robot Build",
      content: "End-to-end robot assembly, testing, and optimization",
      image: "/assets/journey4.png"
    },
    {
      step: "Step 5",
      title: "Competition Ready",
      content: "Advanced challenges, teamwork, and performance tuning",
      image: "/assets/journey5_competition_3d.png"
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
        <SplitText
          text="Your Robotics Learning Journey"
          tag="h2"
          delay={40}
          duration={1.3}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
          className="journey-title"
        />
        <TextType
          text="A carefully designed, milestone-driven path that transforms curiosity into competition-ready robotics expertise."
          className="journey-description"
          typingSpeed={35}
          deletingSpeed={20}
          pauseDuration={3000}
          loop={true}
          showCursor={true}
          cursorCharacter="|"
          cursorBlinkDuration={0.6}
        />
      </div>

      {/* FEATURE STEPS COMPONENT */}
      <FeatureSteps
        features={features}
        title=""
        autoPlayInterval={4000}
      />
    </section>
  );
}
