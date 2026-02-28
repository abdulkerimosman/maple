import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const cards = useMemo(() => {
    const modules = import.meta.glob('../assets/**/*.{jpg,jpeg,png,HEIC}', { eager: true });

    const buckets = [
      { id: 1, title: 'Morning Start', span: 'col-span-2 row-span-2', images: [] },
      { id: 2, title: 'Authentic Brew', span: 'col-span-1 row-span-1', images: [] },
      { id: 3, title: 'Sweet Treats', span: 'col-span-1 row-span-2', images: [], objectFit: 'cover' },
      { id: 4, title: 'Refreshments', span: 'col-span-1 row-span-2', images: [] },
      { id: 5, title: 'Signatures', span: 'col-span-1 row-span-1', images: [] },
      { id: 6, title: 'Hot Plates', span: 'col-span-2 row-span-1', images: [] },
    ];

    for (const path in modules) {
      if (path.includes('Location Picture') || path.includes('Logos') || path.includes('maple-logo')) continue;

      const src = modules[path].default;

      if (path.includes('Breakfast')) buckets[0].images.push(src);
      else if (path.includes('Arabic Coffee')) buckets[1].images.push(src);
      else if (path.includes('Cakes')) buckets[2].images.push(src);
      else if (path.includes('Drinks')) buckets[3].images.push(src);
      else if (path.includes('Food')) {
        if (path.includes('Burger') || path.includes('Sandwich')) buckets[4].images.push(src);
        else buckets[5].images.push(src);
      }
    }

    // Ensure no empty buckets
    buckets.forEach(b => {
      if (b.images.length === 0) b.images.push('');
    });

    return buckets;
  }, []);

  // Track the active image index for each card independently
  const [activeIndices, setActiveIndices] = useState(
    cards.reduce((acc, card) => ({ ...acc, [card.id]: 0 }), {})
  );

  const nextSlide = (e, cardId, length) => {
    e.stopPropagation();
    setActiveIndices(prev => ({
      ...prev,
      [cardId]: (prev[cardId] + 1) % length
    }));
  };

  const prevSlide = (e, cardId, length) => {
    e.stopPropagation();
    setActiveIndices(prev => ({
      ...prev,
      [cardId]: (prev[cardId] - 1 + length) % length
    }));
  };

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container" style={{ textAlign: 'center', margin: '2rem auto 4rem' }}>
        <span className="subtitle">Our Menu</span>
        <h2>A Feast for the Eyes</h2>
      </div>

      <div className="container">
        <div className="gallery-grid">
          {cards.map((card) => {
            const activeIdx = activeIndices[card.id];
            const hasMultiple = card.images.length > 1;

            return (
              <div key={card.id} className={`gallery-item ${card.span}`}>
                <div className="img-overlay"></div>

                {/* Image Stack */}
                {card.images.map((imgSrc, imgIdx) => (
                  <img
                    key={imgIdx}
                    src={imgSrc}
                    alt={card.title}
                    loading="lazy"
                    className={activeIdx === imgIdx ? 'active' : 'inactive'}
                    style={{
                      objectFit: card.objectFit || 'cover',
                      objectPosition: card.id === 3 ? 'center bottom' : 'center center'
                    }}
                  />
                ))}

                {/* Premium Navigation Buttons */}
                {hasMultiple && (
                  <div className="slide-nav">
                    <button
                      className="slide-btn"
                      onClick={(e) => prevSlide(e, card.id, card.images.length)}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <button
                      className="slide-btn"
                      onClick={(e) => nextSlide(e, card.id, card.images.length)}
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                )}

                {/* Slide Indicators (Dots) */}
                {hasMultiple && (
                  <div className="slide-indicators">
                    {card.images.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        className={`indicator-dot ${activeIdx === dotIdx ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                )}

                <div className="img-caption">
                  <span>{card.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .gallery-section {
          background-color: var(--color-background);
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

        .gallery-section h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          color: var(--color-text-primary);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 250px;
          gap: 1.5rem;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: var(--color-surface);
        }

        .gallery-item img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease-in-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-item img.active {
          opacity: 1;
          z-index: 0;
        }

        .gallery-item img.inactive {
          opacity: 0;
          z-index: -1;
        }

        .img-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to top,
            rgba(44, 30, 22, 0.8) 0%,
            transparent 60%
          );
          opacity: 0.4;
          z-index: 1;
          transition: opacity 0.4s ease;
        }

        /* Slide Navigation Styling */
        .slide-nav {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none; /* Let hover pass through to item unless on button */
        }

        .slide-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .slide-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
        
        .slide-btn:active {
          transform: scale(0.95);
        }

        .slide-indicators {
          position: absolute;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
        }

        .indicator-dot.active {
          background: white;
          transform: scale(1.2);
          box-shadow: 0 0 8px rgba(255,255,255,0.6);
        }

        .img-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem;
          z-index: 2;
          transform: translateY(10px);
          transition: all 0.4s ease;
        }

        .img-caption span {
          color: var(--color-background);
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        /* Hover Effects */
        .gallery-item:hover img.active {
          transform: scale(1.03);
        }

        .gallery-item:hover .img-overlay {
          opacity: 0.7;
        }

        .gallery-item:hover .slide-nav,
        .gallery-item:hover .slide-indicators {
          opacity: 1;
        }

        .gallery-item:hover .img-caption {
          transform: translateY(0);
        }

        /* Desktop Layout Modifiers */
        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .col-span-2 { grid-column: span 2; }
          .col-span-1 { grid-column: span 1; }
          .row-span-2 { grid-row: span 2; }
          .row-span-1 { grid-row: span 1; }
        }

        @media (max-width: 767px) {
          .gallery-item {
            grid-column: span 2 !important;
            /* Allowed natural row spans to prevent image cropping */
          }
          .row-span-1 { grid-row: span 1 !important; }
          .row-span-2 { grid-row: span 2 !important; }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
