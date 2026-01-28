import "./BenefitsSection.css";

export default function BenefitsSection() {
    return (
        <section className="benefits-section" id="benefits">
            {/* Header */}
            <div className="benefits-header">
                <h2>What Will Your Kid Receive?</h2>
                <p>Everything needed to build, learn, and succeed in robotics and AI</p>
            </div>

            {/* Cards Grid */}
            <div className="benefits-grid">
                {/* Card 1: Robotics Kit */}
                <div className="benefit-card">
                    <div className="benefit-image">
                        <img
                            src="/assets/images/benefits-kit-3d.png"
                            alt="Student building robot with mentor"
                        />
                    </div>
                    <div className="benefit-content">
                        <h3>Robotics Kit & Curriculum</h3>
                        <p>Specially designed for young innovators to build, code, and explore robotics at home</p>
                    </div>
                </div>

                {/* Card 2: Online/Live Classes */}
                <div className="benefit-card">
                    <div className="benefit-image">
                        <img
                            src="/assets/images/benefits-live-3d.png"
                            alt="Live online robotics class with mentor"
                        />
                    </div>
                    <div className="benefit-content">
                        <h3>Online/Live Robotics Classes</h3>
                        <p>Real-time, instructor-led sessions that guide students step-by-step through projects</p>
                    </div>
                </div>

                {/* Card 3: Future-Ready Skills */}
                <div className="benefit-card">
                    <div className="benefit-image">
                        <img
                            src="/assets/images/benefits-skills-3d.png"
                            alt="Students presenting robot at competition"
                        />
                    </div>
                    <div className="benefit-content">
                        <h3>Future-Ready Skills</h3>
                        <p>Hands-on learning that builds confidence in AI, problem-solving, and creativity</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
