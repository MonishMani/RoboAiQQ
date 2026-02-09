import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useMagneticButton } from '../hooks/useMagneticButton';
import { ProtectedEmail, ROBOAIQ_EMAILS } from '../utils/emailProtection';
import { submitInterestForm } from '../lib/form-submissions';
import './WeRrcmContactForm.css';

function WeRrcmContactForm() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 });
  const submitBtnRef = useMagneticButton({ strength: 10, radius: 60 });

  const [formData, setFormData] = useState({
    studentName: '',
    age: '',
    email: '',
    phone: '',
    interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const result = await submitInterestForm({
        student_name: formData.studentName,
        age: parseInt(formData.age),
        email: formData.email,
        phone: formData.phone,
        interest: formData.interest
      });

      if (result.success) {
        setSubmitMessage({ type: 'success', text: 'Thank you! Your interest has been registered successfully.' });
        setFormData({
          studentName: '',
          age: '',
          email: '',
          phone: '',
          interest: ''
        });
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Failed to submit. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="robo-contact-section section-parallax" id="contact">
      <div className="container">
        {/* HEADER */}
        <div
          ref={headerRef}
          className={`robo-contact-header scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <h1>
            Join <span className='contact-head'>ROBOAIQ</span>
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
              <div className="icon-box phone">
                <i className="fa-solid fa-phone-volume"></i>
              </div>
              <div>
                <span style={{ color: '#FF1E1E' }}>Phone</span>
                <p><a href="tel:+918971252285" className="phone-link">+91 8971252285</a></p>
                <p><a href="tel:+919962499556" className="phone-link">+91 99624 99556</a></p>
              </div>
            </div>

            <div className="contact-card card-premium glass-premium">
              <div className="icon-box email">
                <i className="fa-solid fa-envelope-open-text"></i>
              </div>
              <div>
                <span style={{ color: '#FF1E1E' }}>Email</span>
                <p>
                  <ProtectedEmail
                    user={ROBOAIQ_EMAILS.sales.user}
                    domain={ROBOAIQ_EMAILS.sales.domain}
                  >
                    sales@roboaiq.in
                  </ProtectedEmail>
                </p>
                <p>
                  <ProtectedEmail
                    user="info"
                    domain={ROBOAIQ_EMAILS.sales.domain}
                  >
                    info@roboaiq.in
                  </ProtectedEmail>
                </p>
              </div>
            </div>

            <div className="contact-card card-premium glass-premium">
              <div className="icon-box location">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <span style={{ color: '#FF1E1E' }}>Location</span>
                <p>Bangalore</p>
                <p>Hyderabad</p>
                <p>Chennai</p>
                <p>Pune</p>
              </div>
            </div>


          </div>

          {/* CENTER FORM */}
          <div className={`robo-form-card glass-premium glass-glow scroll-slide-right ${sectionVisible ? 'visible' : ''}`}>
            <h2><span>Register Your Interest</span></h2>
            <p className="subtitle">
              Start building intelligent systems with real-world impact
            </p>

            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Student Name" 
                required 
              />
              <input 
                type="number" 
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age (10–18)" 
                required 
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address" 
                required 
              />
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number" 
                required 
              />
              <textarea 
                rows="4" 
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                placeholder="Tell us about your interest" 
              />
              {submitMessage.text && (
                <div className={`submit-message ${submitMessage.type}`}>
                  {submitMessage.text}
                </div>
              )}
              <button
                ref={submitBtnRef}
                type="submit"
                className="btn-premium btn-magnetic"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeRrcmContactForm;

