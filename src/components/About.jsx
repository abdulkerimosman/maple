import React, { useEffect, useRef } from 'react';
import aboutImg from '../assets/Location Picture/Outside.jpg';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <div className="container" style={{ margin: '4rem auto' }}>
        <div className="about-grid">

          <div className="about-image reveal fade-in-left">
            <div className="img-wrapper">
              <img src={aboutImg} alt="Maple Cafe Interior" />
              <div className="decorative-box"></div>
            </div>
          </div>

          <div className="about-content reveal fade-in-right">
            <span className="subtitle">Our Story</span>
            <h2>Where aesthetic meets comfort.</h2>
            <p>
              Founded on the belief that food should be an experience, Maple is a sanctuary
              for those who appreciate the fine details. We believe in giving the best service,
              maximum flavor, and an environment that makes you feel at home.
            </p>
            <p>
              Every roast, every pour, and every plate is intentionally designed
              to offer a moment of warmth in your fast-paced day.
            </p>
            <div className="stats">
              <div className="stat-box">
                <span className="stat-number"></span>
                <span className="stat-label"></span>
              </div>
              <div className="stat-box">
                <span className="stat-number"></span>
                <span className="stat-label"></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about {
          background-color: var(--color-surface);
          overflow: hidden;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }

        .img-wrapper {
          position: relative;
          padding: 0 2rem 2rem 0;
        }

        .img-wrapper img {
          width: 100%;
          border-radius: 12px;
          position: relative;
          z-index: 2;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          aspect-ratio: 4/5;
          object-fit: cover;
        }

        .decorative-box {
          position: absolute;
          top: 2rem;
          left: 2rem;
          right: 0;
          bottom: 0;
          background-color: var(--color-background);
          border: 2px solid var(--color-accent);
          border-radius: 12px;
          z-index: 1;
        }

        .subtitle {
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .about-content h2 {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          margin-bottom: 2rem;
          color: var(--color-text-primary);
        }

        .about-content p {
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .stats {
          display: flex;
          gap: 3rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0,0,0,0.05);
        }

        .stat-box {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: var(--color-secondary);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-text-secondary);
        }

        /* Scroll Reveal Animations */
        .reveal {
          opacity: 0;
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-in-left {
          transform: translateX(-50px);
        }

        .fade-in-right {
          transform: translateX(50px);
        }

        .reveal.visible {
          opacity: 1;
          transform: translateX(0);
        }

        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
