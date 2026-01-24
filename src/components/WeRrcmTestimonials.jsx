import { useScrollAnimation } from '../hooks/useScrollAnimation';
import InfiniteMovingCards from './InfiniteMovingCards';
import './WeRrcmTestimonials.css';

function WeRrcmTestimonials() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.2 });

  const testimonials = [
    '"I built my first robot in 3 weeks!" – Arjun Sharma',
    '"Represented India in Russia!" – Janithaa M',
    '"Won engineering scholarship!" – Rohan Kumar',
    '"Now I teach my friends!" – Ananya Reddy'
  ];

  return (
    <section ref={sectionRef} className="wrrcm-testimonials section-parallax">
      <h2 className={`scroll-reveal ${sectionVisible ? 'visible' : ''}`}>What Our Students Say</h2>
      <div className={`scroll-reveal stagger-1 ${sectionVisible ? 'visible' : ''}`}>
        <InfiniteMovingCards items={testimonials} speed={30} />
      </div>
    </section>
  );
}

export default WeRrcmTestimonials;

