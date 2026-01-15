import "./WeRrcmCurriculum.css";

const curriculum = [
  { step: "01", title: "Electronics Fundamentals", icon: "⚡", desc: "Understand circuits, components, and power systems." },
  { step: "02", title: "Sensor Integration", icon: "🧠", desc: "Work with real-world sensors and data acquisition." },
  { step: "03", title: "Motor Control Systems", icon: "⚙️", desc: "Control DC, Servo, and Stepper motors precisely." },
  { step: "04", title: "IoT Communication", icon: "🌐", desc: "Connect robots to the cloud and remote systems." },
  { step: "05", title: "Arduino Programming", icon: "💻", desc: "Code logic, automation, and hardware interaction." },
  { step: "06", title: "Competition Preparation", icon: "🏆", desc: "Build, test, and compete like industry teams." }
];

function WeRrcmCurriculum() {
  return (
    <section className="wrrcm-curriculum">
      {/* STARFIELD */}
      <div className="curriculum-stars" />
      <div className="curriculum-stars stars2" />
      <div className="curriculum-glow" />

      <div className="curriculum-container">
        <div className="curriculum-header">
          <h2>Robotics Curriculum</h2>
          <p>A structured learning path from fundamentals to competition</p>
        </div>

        <div className="curriculum-grid">
          {curriculum.map((item, index) => (
            <div className="curriculum-card" key={index}>
              <div className="card-header">
                <span className="card-step">{item.step}</span>
                <div className="card-icon">{item.icon}</div>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeRrcmCurriculum;
