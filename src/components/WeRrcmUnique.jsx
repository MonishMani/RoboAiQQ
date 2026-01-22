import "./WeRrcmUnique.css";

export default function Unique() {
  return (
    <section className="unique-section" id="about">
      <h2 className="unique-title">What Makes RoboAIQ Unique?</h2>

      <div className="unique-wrapper">
        {/* Galaxy glow */}
        <div className="galaxy-glow"></div>

        {/* Rings */}
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>

        {/* Center */}
        <div className="unique-center">
          <h3>RoboAiQ</h3>
          <p>Robotics Education Excellence</p>
        </div>

        {/* Orbit items */}
        <div className="orbit orbit-1">
          <span className="node"></span>
          <span className="line"></span>
          <div className="orbit-text">
            <h4>World-Class Team</h4>
            <p>Highly skilled professionals</p>
          </div>
        </div>

        <div className="orbit orbit-2">
          <span className="node"></span>
          <span className="line"></span>
          <div className="orbit-text">
            <h4>Global Expertise</h4>
            <p>International billing standards</p>
          </div>
        </div>

        <div className="orbit orbit-3">
          <span className="node"></span>
          <span className="line"></span>
          <div className="orbit-text">
            <h4>Compliance Driven</h4>
            <p>HIPAA & regulatory focus</p>
          </div>
        </div>

        <div className="orbit orbit-4">
          <span className="node"></span>
          <span className="line"></span>
          <div className="orbit-text">
            <h4>Hands-On Support</h4>
            <p>Dedicated account managers</p>
          </div>
        </div>

        <div className="orbit orbit-5">
          <span className="node"></span>
          <span className="line"></span>
          <div className="orbit-text">
            <h4>Small Batch Scale</h4>
            <p>Personalized attention</p>
          </div>
        </div>

        <div className="orbit orbit-6">
          <span className="node"></span>
          <span className="line"></span>
          <div className="orbit-text">
            <h4>Industry Leaders</h4>
            <p>Years of proven results</p>
          </div>
        </div>
      </div>
    </section>
  );
}