import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { TestimonialsSection } from './blocks/testimonials-with-marquee';
import './WeRrcmTestimonials.css';

function WeRrcmTestimonials() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.2 });

  const testimonials = [
    {
      author: {
        name: "Arjun Sharma",
        handle: "Winner - State Robotics Championship",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "I built my first line-following robot in just 3 weeks! The hands-on approach made learning so much fun.",
      href: "#"
    },
    {
      author: {
        name: "Janithaa M",
        handle: "International Competition Participant",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "RoboAiQ helped me represent India at the World Robot War in Russia. It was a dream come true!",
      href: "#"
    },
    {
      author: {
        name: "Rohan Kumar",
        handle: "Engineering Scholarship Winner",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "The Arduino programming skills I learned here helped me win a scholarship for engineering college.",
      href: "#"
    },
    {
      author: {
        name: "Ananya Reddy",
        handle: "Junior Robotics Mentor",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      text: "I never thought I could build a Bluetooth-controlled car. Now I'm teaching my friends!",
      href: "#"
    }
  ];

  return (
    <div ref={sectionRef} className={`wrrcm-testimonials-wrapper ${sectionVisible ? 'visible' : ''}`}>
      <TestimonialsSection
        title={<>What Our <span>Students</span> Say</>}
        description={<>Hear directly from <span className="subtext">students and parents</span> who have experienced RoboAIQ's hands-on robotics education.</>}
        testimonials={testimonials}
      />
    </div>
  );
}

export default WeRrcmTestimonials;

