import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AboutUsPage.css';

export default function AboutUsPage() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-in');
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="about-page">
      <Navbar />

      {/* HERO */}
      <section className="about-hero">
        <div className="hero-grid">
          <div className="hero-left reveal">
            <span className="hero-eyebrow">About RoboAIQ</span>
            <h1 className="hero-title">
              We Build <br /> Future Architects
            </h1>
            <p className="hero-description">
              RoboAIQ is a future-technology and leadership education platform where
              robotics, artificial intelligence, and entrepreneurial thinking converge
              to shape confident innovators of tomorrow.
            </p>
          </div>

          <div className="hero-right reveal">
            <p className="hero-tagline">A launchpad for the exceptional.</p>
            <div className="hero-rule" />

            <figure className="hero-visual" aria-hidden="true">
              <div className="hero-visual-frame">
                <img
                  src="/assets/images/students-action-03.jpg"
                  alt=""
                  loading="eager"
                  decoding="async"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* FOUNDATION */}
      <section className="about-section light">
        <div className="content-wide about-split reveal">
          <div className="about-copy">
            <h2 className="section-title">What We Are</h2>

            <p className="lead-text">
              RoboAIQ is engineered to cultivate visionary innovators, entrepreneurs,
              and future global technology leaders.
            </p>

            <p className="body-text">
              We introduce children to startup thinking, leadership psychology, and
              advanced technology during their formative years—igniting creativity,
              curiosity, calculated risk-taking, and deep ownership of learning.
            </p>

            <div className="signal-row">
              <div className="signal-card">
                <span className="signal-label">Philosophy</span>
                <span className="signal-value">Entrepreneurial Thinking</span>
              </div>
              <div className="signal-card">
                <span className="signal-label">Focus</span>
                <span className="signal-value">Real-World Application</span>
              </div>
            </div>

            <blockquote className="editorial-quote">
              “We don’t teach textbook business — we ignite entrepreneurial thinking
              and leadership from day one.”
            </blockquote>
          </div>

          <div className="about-media" aria-hidden="true">
            <div className="media-card parallax">
              <img
                src="/assets/images/students-action-01.jpg"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="about-section dark">
        <div className="content-wide two-column reveal">
          <div>
            <h2 className="section-title inverse">Why We Exist</h2>
            <p className="lead-text inverse">
              Traditional education prepares students for exams.
              RoboAIQ prepares them to design the future.
            </p>
          </div>

          <div>
            <p className="body-text inverse">
              In a world driven by AI, automation, and exponential innovation,
              students must become architects—not spectators. RoboAIQ was founded
              with clarity: to prepare children to lead tomorrow’s world.
            </p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="about-section light">
        <div className="content-medium reveal">
          <h2 className="section-title">Our Philosophy</h2>

          <h3 className="manifesto">
            Exposure creates <span>excellence.</span>
          </h3>

          <p className="body-text">
            By immersing children in real-world technology ecosystems,
            startup methodologies, and innovation networks early, we empower them to:
          </p>

          <div className="pillar-grid">
            <div className="glass-card">
              <span className="pillar-index">01</span>
              <h4>Think Independently</h4>
              <p>Develop strategic thinking and intellectual confidence</p>
            </div>
            <div className="glass-card">
              <span className="pillar-index">02</span>
              <h4>Solve Complex Problems</h4>
              <p>Apply technology to real-world challenges</p>
            </div>
            <div className="glass-card">
              <span className="pillar-index">03</span>
              <h4>Lead With Confidence</h4>
              <p>Build resilience, decision-making, and leadership presence</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="about-section subtle about-competitive-edge">
        <div className="content-medium reveal">
          <h2 className="section-title">Our Competitive Edge</h2>

          <div className="competitive-grid">
            <article className="competitive-card">
              <figure className="competitive-card-image">
                <img
                  src="/assets/about/1.jpeg"
                  alt="Global Robotics and AI curriculum in a modern robotics classroom"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </figure>
              <h4 className="competitive-card-title">
                Global Robotics &amp; AI Curriculum
              </h4>
              <div className="competitive-card-meta">
                <span className="competitive-card-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                  </svg>
                </span>
                <span className="competitive-card-label">Curriculum Excellence</span>
              </div>
              <p className="competitive-card-text">
                Industry-aligned learning pathways that blend robotics engineering,
                artificial intelligence, and real-world problem solving to prepare
                students for global technology careers.
              </p>
              <button className="card-cta" aria-label="Learn more about our Global Robotics and AI Curriculum">
                Learn More <span aria-hidden="true">→</span>
              </button>
              <div className="competitive-card-progress" aria-hidden="true">
                <span className="competitive-card-progressFill" />
              </div>
            </article>

            <article className="competitive-card">
              <figure className="competitive-card-image">
                <img
                  src="/assets/about/2.jpeg"
                  alt="Advanced robotics lab with modern sensors and robotics hardware"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </figure>
              <h4 className="competitive-card-title">Advanced Robotics Labs</h4>
              <div className="competitive-card-meta">
                <span className="competitive-card-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                  </svg>
                </span>
                <span className="competitive-card-label">Innovation Spaces</span>
              </div>
              <p className="competitive-card-text">
                Hands-on access to modern robotics hardware, sensors, and AI tools in
                labs designed to simulate real engineering environments.
              </p>
              <button className="card-cta" aria-label="Explore our Advanced Robotics Labs">
                Explore Labs <span aria-hidden="true">→</span>
              </button>
              <div className="competitive-card-progress" aria-hidden="true">
                <span className="competitive-card-progressFill" />
              </div>
            </article>

            <article className="competitive-card">
              <figure className="competitive-card-image">
                <img
                  src="/assets/about/3.jpeg"
                  alt="Personalized mentorship with a mentor guiding a student in robotics learning"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </figure>
              <h4 className="competitive-card-title">Personalized Mentorship</h4>
              <div className="competitive-card-meta">
                <span className="competitive-card-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                  </svg>
                </span>
                <span className="competitive-card-label">Student-Centered</span>
              </div>
              <p className="competitive-card-text">
                Dedicated one-on-one guidance from experienced mentors to accelerate
                learning, build confidence, and shape individual technology leadership
                journeys.
              </p>
              <button className="card-cta" aria-label="Meet our Mentors">
                Meet Mentors <span aria-hidden="true">→</span>
              </button>
              <div className="competitive-card-progress" aria-hidden="true">
                <span className="competitive-card-progressFill" />
              </div>
            </article>

            <article className="competitive-card">
              <figure className="competitive-card-image">
                <img
                  src="/assets/about/4.jpeg"
                  alt="Hybrid learning model combining online instruction and hands-on lab practice"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </figure>
              <h4 className="competitive-card-title">Hybrid Learning Model</h4>
              <div className="competitive-card-meta">
                <span className="competitive-card-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                  </svg>
                </span>
                <span className="competitive-card-label">Blended Education</span>
              </div>
              <p className="competitive-card-text">
                A seamless blend of immersive online learning and physical lab
                experiences that ensures flexibility without compromising technical
                mastery.
              </p>
              <button className="card-cta" aria-label="View our Hybrid Learning Model">
                View Model <span aria-hidden="true">→</span>
              </button>
              <div className="competitive-card-progress" aria-hidden="true">
                <span className="competitive-card-progressFill" />
              </div>
            </article>

            <article className="competitive-card">
              <figure className="competitive-card-image">
                <img
                  src="/assets/about/5.jpeg"
                  alt="Global competition exposure with students participating on a robotics stage"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </figure>
              <h4 className="competitive-card-title">Global Competition Exposure</h4>
              <div className="competitive-card-meta">
                <span className="competitive-card-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                  </svg>
                </span>
                <span className="competitive-card-label">Global मंच (Global Stage)</span>
              </div>
              <p className="competitive-card-text">
                Opportunities to participate in international robotics and AI challenges,
                building confidence, collaboration, and global recognition.
              </p>
              <button className="card-cta" aria-label="Learn about Global Events">
                Global Events <span aria-hidden="true">→</span>
              </button>
              <div className="competitive-card-progress" aria-hidden="true">
                <span className="competitive-card-progressFill" />
              </div>
            </article>

            <article className="competitive-card">
              <figure className="competitive-card-image">
                <img
                  src="/assets/about/6.jpeg"
                  alt="Startup and innovation mindset with students pitching ideas and prototypes"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </figure>
              <h4 className="competitive-card-title">Startup &amp; Innovation Mindset</h4>
              <div className="competitive-card-meta">
                <span className="competitive-card-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                  </svg>
                </span>
                <span className="competitive-card-label">Future Founders</span>
              </div>
              <p className="competitive-card-text">
                Early exposure to entrepreneurship, design thinking, and innovation
                frameworks that empower students to transform ideas into ventures.
              </p>
              <button className="card-cta" aria-label="Discover Innovation Programs">
                Innovation <span aria-hidden="true">→</span>
              </button>
              <div className="competitive-card-progress" aria-hidden="true">
                <span className="competitive-card-progressFill" />
              </div>
            </article>

            <article className="competitive-card">
              <figure className="competitive-card-image">
                <img
                  src="/assets/about/7.jpeg"
                  alt="Leadership development with a student presenting confidently"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </figure>
              <h4 className="competitive-card-title">Leadership Development</h4>
              <div className="competitive-card-meta">
                <span className="competitive-card-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                  </svg>
                </span>
                <span className="competitive-card-label">Confidence Building</span>
              </div>
              <p className="competitive-card-text">
                Structured programs that strengthen communication, presentation, and
                decision-making skills essential for future technology leaders.
              </p>
              <button className="card-cta" aria-label="Learn about Leadership Development">
                Leadership <span aria-hidden="true">→</span>
              </button>
              <div className="competitive-card-progress" aria-hidden="true">
                <span className="competitive-card-progressFill" />
              </div>
            </article>

            <article className="competitive-card">
              <figure className="competitive-card-image">
                <img
                  src="/assets/about/8.jpeg"
                  alt="Applied STEM learning with students building real-world engineering solutions"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </figure>
              <h4 className="competitive-card-title">Applied STEM Learning</h4>
              <div className="competitive-card-meta">
                <span className="competitive-card-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                  </svg>
                </span>
                <span className="competitive-card-label">Real Impact</span>
              </div>
              <p className="competitive-card-text">
                Project-based STEM programs where students design, build, and deploy
                solutions to real-world challenges using engineering and technology.
              </p>
              <button className="card-cta" aria-label="See Student Projects">
                Projects <span aria-hidden="true">→</span>
              </button>
              <div className="competitive-card-progress" aria-hidden="true">
                <span className="competitive-card-progressFill" />
              </div>
            </article>

            <article className="competitive-card">
              <figure className="competitive-card-image">
                <img
                  src="/assets/about/9.jpeg"
                  alt="Industry integration connecting students with technology mentors and partners"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                />
              </figure>
              <h4 className="competitive-card-title">Industry Integration</h4>
              <div className="competitive-card-meta">
                <span className="competitive-card-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                  </svg>
                </span>
                <span className="competitive-card-label">Industry Connect</span>
              </div>
              <p className="competitive-card-text">
                Direct collaboration with technology ecosystems, mentors, and innovation
                partners that connects learning with real industry practice.
              </p>
              <button className="card-cta" aria-label="See our Industry Partners">
                Partners <span aria-hidden="true">→</span>
              </button>
              <div className="competitive-card-progress" aria-hidden="true">
                <span className="competitive-card-progressFill" />
              </div>
            </article>

            <article className="competitive-card">
              <figure className="competitive-card-image">
                <img
                  src="/assets/about/10.jpeg"
                  alt="Future-ready culture in a modern innovation learning environment"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <h4 className="competitive-card-title">Future-Ready Culture</h4>
              <div className="competitive-card-meta">
                <span className="competitive-card-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
                  </svg>
                </span>
                <span className="competitive-card-label">Future Focus</span>
              </div>
              <p className="competitive-card-text">
                A learning environment that nurtures creativity, adaptability, and ethical
                innovation to prepare students for tomorrow&apos;s technology landscape.
              </p>
              <div className="competitive-card-progress" aria-hidden="true">
                <span className="competitive-card-progressFill" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="about-section light">
        <div className="content-wide split reveal">
          <div>
            <h3 className="block-title">Our Vision</h3>
            <p className="body-text">
              To nurture confident communicators, audacious innovators,
              and ethical leaders shaping the future of technology and society.
            </p>
          </div>

          <div>
            <h3 className="block-title">Our Mission</h3>
            <p className="body-text">
              To deliver world-class future-technology education that develops
              technical mastery, entrepreneurial mindset, and leadership excellence.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="about-closing">
        <div className="closing-inner reveal">
          <h2>RoboAIQ is not an institute.</h2>
          <h1>It is a launchpad for the exceptional.</h1>
        </div>
      </section>

      <Footer />
    </div>
  );
}
