import { FaMicrochip, FaWifi, FaCode, FaCogs, FaRobot, FaTrophy, FaWaveSquare } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import "./WeRrcmCurriculum.css";

const curriculum = [
  {
    step: "01",
    title: "Electronics Fundamentals",
    desc: "Core understanding of circuits, components, signal flow, and power systems used in robotics.",
    icon: FaMicrochip
  },
  {
    step: "02",
    title: "Sensor Integration",
    desc: "Interfacing real-world sensors, data acquisition, calibration, and interpretation.",
    icon: FaWaveSquare
  },
  {
    step: "03",
    title: "Motor Control Systems",
    desc: "Precise control of DC, servo, and stepper motors with feedback mechanisms.",
    icon: FaCogs
  },
  {
    step: "04",
    title: "IoT & Communication Systems",
    desc: "Wireless communication, cloud connectivity, and remote robotic control.",
    icon: FaWifi
  },
  {
    step: "05",
    title: "Embedded Programming",
    desc: "Programming microcontrollers for automation, logic execution, and hardware interaction.",
    icon: FaCode
  },
  {
    step: "06",
    title: "Competition & System Integration",
    desc: "End-to-end system building, testing, optimization, and competitive deployment.",
    icon: FaTrophy
  }
];

function WeRrcmCurriculum() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section ref={sectionRef} className="wrrcm-curriculum section-parallax" id="programs">
      {/* Background effects */}
      <div className="curriculum-glow" />

      <div className="container">
        <div
          ref={headerRef}
          className={`curriculum-header scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <h2>Robotics Programme Curriculum</h2>
          <p>
            A structured progression from foundational engineering concepts
            to advanced competitive robotics systems
          </p>
        </div>

        <div className="curriculum-network">
          <div className="curriculum-grid">
            {curriculum.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  className={`curriculum-card card-premium glass-premium scroll-reveal stagger-${index + 1} ${sectionVisible ? 'visible' : ''}`}
                  key={index}
                >
                  <div className="card-icon-wrapper">
                    <Icon className="card-icon" />
                  </div>
                  <div className="card-content">
                    <div className="card-index">MODULE {item.step}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeRrcmCurriculum;

