import Particles from './Particles';
import "./WeRrcmJourney.css";

export default function WeRrcmJourney() {
  const checkpoints = [
    { id: 1, title: "Electronics Basics", desc: "Circuits, components & fundamentals", side: "left" },
    { id: 2, title: "Sensors & Coding", desc: "Arduino & sensor intelligence", side: "right" },
    { id: 3, title: "Motors & Actuators", desc: "Motion control & mechanics", side: "left" },
    { id: 4, title: "Complete Robot Build", desc: "End-to-end robot development", side: "right" },
    { id: 5, title: "Competition Ready", desc: "International robotics exposure", side: "left" },
    { id: 6, title: "Small Batch Mentorship", desc: "Personalized expert guidance", side: "right" }
  ];

  return (
    <section className="neural-journey">
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <h2 className="journey-title">Your Robotics Journey</h2>

      <div className="neural-system">
        {/* CENTRAL CORE */}
        <div className="neural-core">
          <div className="core-ring" />
          <span>RoboAiQ</span>
        </div>

        {/* NEURAL PATH */}
        <div className="neural-line" />

        {/* CHECKPOINTS */}
        {checkpoints.map((cp, index) => (
          <div key={cp.id} className={`neural-node ${cp.side}`} style={{ top: `${15 + index * 12}%` }}>
            <div className="node-dot">{cp.id}</div>
            <div className="node-connector" />
            <div className="node-content">
              <h4>{cp.title}</h4>
              <p>{cp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
