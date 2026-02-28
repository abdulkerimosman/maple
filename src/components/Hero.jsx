import React from 'react';
import heroBg from '../assets/Location Picture/Inside.jpg';

const Hero = () => {
  return (
    <header id="home" className="hero">
      {/* Background Image Layer */}
      <div className="hero-bg" style={{ backgroundImage: `url('${heroBg}')` }}></div>
      <div className="hero-overlay"></div>

      {/* Content Layer */}
      <div className="container hero-content">
        <h1 className="hero-title animate-fade-in-up">
          Your Modern <br /> Cafe and Bakery.
        </h1>
        <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Comfort, quality and great interiors. Cookies, cakes, pastries and more.
        </p>
        <div className="hero-actions animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <a href="#about" className="btn-primary">Our Story</a>
          <a href="#gallery" className="btn-outline">View Menu</a>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-bg, .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .hero-bg {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -2;
          /* Subtle slow zoom effect */
          animation: slowZoom 20s ease-out infinite alternate;
        }

        .hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(44, 30, 22, 0.4) 0%,
            rgba(44, 30, 22, 0.7) 100%
          );
          z-index: -1;
        }

        .hero-content {
          color: var(--color-background);
          max-width: 800px;
          padding-top: 4rem;
        }

        .hero-title {
          font-size: clamp(3.5rem, 8vw, 6rem);
          margin-bottom: 1.5rem;
          color: var(--color-background); /* White text contrasting dark overlay */
        }

        .hero-subtitle {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          margin-bottom: 3rem;
          opacity: 0.9;
          font-family: var(--font-sans);
          font-weight: 300;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .hero-actions .btn-outline {
          color: var(--color-background);
          border-color: var(--color-background);
        }

        .hero-actions .btn-outline:hover {
          background-color: var(--color-background);
          color: var(--color-text-primary);
        }

        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }

        @media (max-width: 768px) {
          .hero-content {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </header>
  );
};

export default Hero;
