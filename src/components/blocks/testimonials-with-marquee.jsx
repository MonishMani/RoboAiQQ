import { motion } from 'framer-motion';
import '../../styles/testimonials-with-marquee.css';

export function TestimonialsSection({ title, description, testimonials }) {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="testimonials-marquee">
          <div className="marquee-content">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card glass-premium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % testimonials.length) * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Quote Icon */}
                <div className="quote-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="quote-icon">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.576-8.983 10.609l-.995-2.151c2.418-.383 5.013-1.854 5.013-4.401v-1.119h-5v-10.329h9.965zm14 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.391 5.029-1.854 5.029-4.401v-1.119h-5v-10.329h9.967z" />
                  </svg>
                </div>

                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.text}"</p>

                  <div className="testimonial-author-text">
                    <p className="author-name">{testimonial.author.name}</p>
                    <p className="author-handle">{testimonial.author.handle}</p>
                  </div>
                </div>

                {/* Avatar positioned absolutely */}
                <img
                  src={testimonial.author.avatar}
                  alt={testimonial.author.name}
                  className="author-avatar"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
