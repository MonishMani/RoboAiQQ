import "./RoboKitSection.css";
import ScrollReveal from "./ScrollReveal";
import TextType from "./TextType";

export default function RoboKitSection() {
  return (
    <section className="kit-section" id="programs">

      {/* HEADER */}
      <div className="kit-header">
        <span className="kit-eyebrow">HARDWARE INCLUDED</span>
        <h2>Industry-Grade <span>Robotics Kit</span> Included with Your Program</h2>
        <TextType
          text="Every RoboAIQ student receives a complete, reusable robotics kit designed for hands-on learning, experimentation, and long-term use."
          className="kit-scroll-reveal kit-scroll-text"
          typingSpeed={35}
          deletingSpeed={20}
          pauseDuration={3000}
          loop={true}
          showCursor={true}
          cursorCharacter="|"
          cursorBlinkDuration={0.6}
        />
      </div>

      {/* GRID */}
      <div className="kit-grid">

        {/* IMAGE */}
        <div className="kit-image">
          <img src="/assets/images/robokit.jpeg" alt="Arduino Uno Board" />
        </div>

        {/* CONTENT */}
        <div className="kit-content">
          <h3>What's Inside the <span>RoboAIQ</span> <span>Robotics</span> Kit</h3>

          <ul className="kit-list">
            <li>Arduino Uno & ESP32 Microcontrollers</li>
            <li>DC Motors, Servo Motors & Motor Drivers</li>
            <li>Ultrasonic, IR & Temperature Sensors</li>
            <li>LED Displays & Output Modules</li>
            <li>Breadboard, Jumper Wires & Connectors</li>
            <li>Wheels, Chassis & Battery Pack</li>
            <li>USB Cables, Resistors & Capacitors</li>
            <li>Expansion-ready components for future projects</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
