import { useScrollAnimation } from "../hooks/useScrollAnimation";
import FeatureSteps from "./FeatureSteps";
import "./WeRrcmJourney.css";

export default function WeRrcmJourney() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });

  const features = [
    {
      step: "Step 1",
      title: "Foundations of Robotics",
      content: "Electronics basics, components, and problem-solving mindset",
      image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&auto=format&fit=crop&q=60"
    },
    {
      step: "Step 2",
      title: "Sensors & Coding",
      content: "Arduino programming, sensor intelligence, and logic building",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"
    },
    {
      step: "Step 3",
      title: "Motors & Actuators",
      content: "Motion control, mechanics, and real-world movement systems",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
    },
    {
      step: "Step 4",
      title: "Complete Robot Build",
      content: "End-to-end robot assembly, testing, and optimization",
      image: "https://images.unsplash.com/photo-1535746272736-4b100091cd2c?w=800&auto=format&fit=crop&q=60"
    },
    {
      step: "Step 5",
      title: "Competition Ready",
      content: "Advanced challenges, teamwork, and performance tuning",
      image: "https://images.unsplash.com/photo-1485579149c01123123?w=800&auto=format&fit=crop&q=60"
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
          Your <span>Robotics</span> Learning Journey
        </h2>
        <p>
          A carefully designed, milestone-driven path that transforms curiosity
          into competition-ready robotics expertise.
        </p>
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
