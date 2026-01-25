import React, { useRef, useEffect } from "react";
import "./timeline.css";

export const Timeline = ({ data }) => {
  const [active, setActive] = React.useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const { top } = ref.current.getBoundingClientRect();
      setActive(Math.floor((window.innerHeight - top) / 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="timeline-container" ref={ref}>
      <div className="timeline-content">
        {data.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker">
              <div className={`timeline-dot ${index <= active ? "active" : ""}`} />
            </div>
            <div className="timeline-body">
              <h3 className="timeline-title">{item.title}</h3>
              <div className="timeline-content-inner">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
