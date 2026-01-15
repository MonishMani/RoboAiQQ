import "./WeRrcmJourney.css";

export default function WeRrcmJourney() {
  const checkpoints = [
    {
      id: 1,
      title: "Electronics Basics",
      desc: "Understand circuits, components, breadboards, and electrical fundamentals",
      position: "top-left"
    },
    {
      id: 2,
      title: "Sensors & Coding",
      desc: "Learn Arduino programming and integrate sensors to make intelligent decisions",
      position: "left"
    },
    {
      id: 3,
      title: "Motors & Actuators",
      desc: "Control motors, servos, and mechanical motion systems used in real robots",
      position: "bottom-left"
    },
    {
      id: 4,
      title: "Complete Robot Build",
      desc: "Design, assemble, and program a fully functional robot from start to finish",
      position: "bottom-center"
    },
    {
      id: 5,
      title: "Competition Ready",
      desc: "Prepare for international robotics competitions with advanced strategies",
      position: "right"
    },
    {
      id: 6,
      title: "Small Batch Sizes",
      desc: "Personalized mentorship and individualized attention for every student",
      position: "bottom-right"
    }
  ];

  return (
    <section className="wrrcm-journey">
      <div className="journey-header">
        <h2>The WeRrcm Learning Highway</h2>
      </div>

      <div className="journey-container">
        <div className="journey-grid">
          {checkpoints.map((checkpoint) => (
            <div
              key={checkpoint.id}
              className={`checkpoint-card ${checkpoint.position}`}
            >
              <div className="checkpoint-marker">
                <div className="checkpoint-dot">{checkpoint.id}</div>
              </div>
              <div className="checkpoint-info">
                <h3>{checkpoint.title}</h3>
                <p>{checkpoint.desc}</p>
              </div>
            </div>
          ))}

          <div className="center-visual">
            <div className="center-circle"></div>
            <div className="center-text">World-Class Education</div>
          </div>
        </div>
      </div>
    </section>
  );
}
