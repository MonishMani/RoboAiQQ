import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useMagneticButton } from '../hooks/useMagneticButton';
import './WeRrcmContactForm.css';

function WeRrcmContactForm() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 });
  const submitBtnRef = useMagneticButton({ strength: 10, radius: 60 });

  return (
    <section ref={sectionRef} className="robo-contact-section section-parallax" id="contact">

      {/* HEADER */}
      <div
        ref={headerRef}
        className={`robo-contact-header scroll-reveal ${headerVisible ? 'visible' : ''}`}
      >
        <h1>
          Join <span>ROBOAIQ</span>
        </h1>
        <p>
          Where autonomous systems, artificial intelligence, and human ambition converge.
        </p>
      </div>

      <div className="robo-contact-grid">

        {/* LEFT SIDE */}
        <div className={`robo-left scroll-slide-left ${sectionVisible ? 'visible' : ''}`}>

          {/* CONTACT INFO */}
          <div className="contact-card card-premium glass-premium">
            <div className="icon-box">
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2
                A19.86 19.86 0 0 1 3 5.18
                2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72
                c.12.81.32 1.6.59 2.36
                a2 2 0 0 1-.45 2.11L9 10
                a16 16 0 0 0 5 5l.81-.14
                a2 2 0 0 1 2.11-.45
                c.76.27 1.55.47 2.36.59
                A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <span>Phone</span>
              <p>8971252285</p>
            </div>
          </div>

          <div className="contact-card card-premium glass-premium">
            <div className="icon-box">
              <svg viewBox="0 0 24 24">
                <path d="M4 4h16v16H4z" fill="none" />
                <path d="M4 4l8 8 8-8" />
              </svg>
            </div>
            <div>
              <span>Email</span>
              <p>sales@roboaiq.com</p>
            </div>
          </div>

          <div className="contact-card card-premium glass-premium">
            <div className="icon-box">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9
                c0 5.25 7 13 7 13s7-7.75 7-13
                c0-3.87-3.13-7-7-7z" />
              </svg>
            </div>
            <div>
              <span>Location</span>
              <p>
                RoboAiQ Headquarters
              </p>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <ul className="robo-highlights">
            <li>Autonomous Robotics Programs</li>
            <li>AI Research-Oriented Training</li>
            <li>Hands-On Hardware Experience</li>
            <li>Global Competition Exposure</li>
          </ul>
        </div>

        {/* CENTER FORM */}
        <div className={`robo-form-card glass-premium glass-glow scroll-slide-right ${sectionVisible ? 'visible' : ''}`}>
          <h2>Register Your Interest</h2>
          <p className="subtitle">
            Start building intelligent systems with real-world impact
          </p>

          <form>
            <input type="text" placeholder="Student Name" required />
            <input type="number" placeholder="Age (10–18)" required />
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" required />
            <textarea rows="4" placeholder="Tell us about your interest" />
            <button
              ref={submitBtnRef}
              type="submit"
              className="btn-premium btn-magnetic"
            >
              Submit Enquiry
            </button>
          </form>
        </div>

        {/* RIGHT SIDE 3D MODEL */}

      </div>
    </section>
  );
}

export default WeRrcmContactForm;

