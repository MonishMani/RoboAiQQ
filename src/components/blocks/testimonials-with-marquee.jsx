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
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      className="author-avatar"
                    />
                    <div className="author-info">
                      <p className="author-name">{testimonial.author.name}</p>
                      <p className="author-handle">{testimonial.author.handle}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
