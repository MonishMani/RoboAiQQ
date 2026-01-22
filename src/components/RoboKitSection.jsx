import "./RoboKitSection.css";

export default function RoboKitSection() {
  return (
    <section className="kit-section">

      {/* TITLE */}
      <div className="kit-header">
        <h2>Complete Robotics Kit Included</h2>
        <p>Everything you need to start building intelligent robots — no extras required</p>
      </div>

      {/* KIT GRID */}
      <div className="kit-grid">

        {/* IMAGE */}
        <div className="kit-image">
          <img src="/robokit.png" alt="Robotics Kit" />
        </div>

        {/* CONTENT */}
        <div className="kit-content">
          <h3>Your Complete Kit Includes</h3>

          <ul className="kit-list">
            <li>Arduino Uno Microcontroller</li>
            <li>ESP32 Microcontroller</li>
            <li>DC Motors & Motor Drivers</li>
            <li>Servo Motors</li>
            <li>Ultrasonic & IR Sensors</li>
            <li>Temperature Sensors</li>
            <li>LED Displays</li>
            <li>Breadboard & Jumper Wires</li>
            <li>Wheels, Chassis & Battery Pack</li>
            <li>USB Cable, Resistors & Capacitors</li>
          </ul>

          <div className="kit-badge">
            Worth ₹15,000+ · Yours to Keep Forever
          </div>
        </div>

      </div>



    </section>
  );
}
