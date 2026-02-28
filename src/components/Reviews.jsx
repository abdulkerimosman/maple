import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─── EmailJS credentials (set values in .env) ────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Overall Experience',
  'Coffee & Drinks',
  'Food & Meals',
  'Cakes & Desserts',
  'Service',
  'Ambiance & Space',
];

const curatedReviews = [
  {
    id: 1,
    category: 'Overall Experience',
    rating: 5,
    comment: 'A lovely new cafe with great coffee drinks and incredibly refreshing virgin mojitos— so good! The staff is attentive and welcoming, and the space is bright, modern and very spacious. A great spot to relax or catch up with friends.',
    date: '4 weeks ago',
  },
  {
    id: 2,
    category: 'Food & Meals',
    rating: 5,
    comment: 'I tried their mini burger with ginger tea. The flavour was great, the portion was satisfying, and the fries were perfectly crispy just how I like them.',
    date: 'a month ago',
  },
];

const StarRating = ({ rating, hoverRating, onHover, onLeave, onClick }) => (
  <div className="star-interaction">
    {[...Array(5)].map((_, i) => {
      const val = i + 1;
      return (
        <button
          type="button"
          key={i}
          className="star-btn"
          onMouseEnter={() => onHover(val)}
          onMouseLeave={onLeave}
          onClick={() => onClick(val)}
          aria-label={`Rate ${val} out of 5`}
        >
          <Star
            size={28}
            className={(hoverRating || rating) >= val ? 'star-filled interactive' : 'star-empty'}
            fill={(hoverRating || rating) >= val ? 'var(--color-primary)' : 'none'}
          />
        </button>
      );
    })}
  </div>
);

const Reviews = () => {
  const formRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !category || !comment) return;

    setStatus('sending');

    // Debug: confirm env vars are loaded
    console.log('EmailJS config:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      publicKey: EMAILJS_PUBLIC_KEY,
    });

    const sentAt = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const templateParams = {
      category,
      rating: `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)`,
      comment,
      sent_at: sentAt,
      // Required by default EmailJS template fields
      name: 'Maple Cafe Website',
      email: 'no-reply@maplecafe.com',
      message: comment,
      time: sentAt,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        setTimeout(() => {
          setRating(0);
          setCategory('');
          setComment('');
          setStatus('idle');
        }, 4000);
      })
      .catch((err) => {
        console.error('EmailJS error status:', err.status);
        console.error('EmailJS error text:', err.text);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      });
  };

  return (
    <section id="reviews" className="section reviews-section">
      <div className="container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="subtitle">Community</span>
        <h2>Your Thoughts</h2>
      </div>

      <div className="container reviews-content">

        {/* Curated Reviews Column */}
        <div className="reviews-list">
          {curatedReviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{rev.category}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google Review">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
                <span className="review-date">{rev.date}</span>
              </div>
              <div className="stars-display">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < rev.rating ? 'star-filled' : 'star-empty'}
                    fill={i < rev.rating ? 'var(--color-accent)' : 'none'}
                  />
                ))}
              </div>
              <p className="review-text">"{rev.comment}"</p>
            </div>
          ))}
        </div>

        {/* Submission Form Column */}
        <div className="review-form-container glass">
          {status === 'success' ? (
            <div className="success-message animate-fade-in">
              <div className="success-icon">✓</div>
              <h3>Thank you!</h3>
              <p>Your review adds flavor to our community.</p>
            </div>
          ) : status === 'error' ? (
            <div className="success-message animate-fade-in">
              <div className="success-icon error-icon">✕</div>
              <h3>Something went wrong</h3>
              <p>Please try again or contact us directly.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="review-form">
              <h3>Share Your Experience</h3>

              {/* Star Rating */}
              <div className="rating-input">
                <span>Rating</span>
                <StarRating
                  rating={rating}
                  hoverRating={hoverRating}
                  onHover={setHoverRating}
                  onLeave={() => setHoverRating(0)}
                  onClick={setRating}
                />
              </div>

              {/* Category Dropdown */}
              <div className="form-group">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="category-select"
                >
                  <option value="" disabled>What are you reviewing?</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Comment */}
              <div className="form-group">
                <textarea
                  placeholder="Tell us what you loved, or how we can improve..."
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary form-submit"
                disabled={!rating || !category || status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>

      </div>

      <style>{`
        .reviews-section {
          background-color: #f2eee8;
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

        .reviews-section h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          color: var(--color-text-primary);
        }

        .reviews-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: start;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .review-card {
          background-color: var(--color-surface);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: transform 0.3s ease;
        }

        .review-card:hover {
          transform: translateY(-5px);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .reviewer-name {
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .review-date {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .stars-display {
          display: flex;
          gap: 2px;
          margin-bottom: 1rem;
        }

        .star-filled { color: var(--color-accent); }
        .star-filled.interactive { color: var(--color-primary); }
        .star-empty { color: #dcd6ce; }

        .review-text {
          font-style: italic;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .review-form-container {
          padding: 3rem 2rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
        }

        .review-form h3 {
          font-family: var(--font-sans);
          font-size: 1.5rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .rating-input {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .rating-input span {
          font-weight: 500;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .star-interaction {
          display: flex;
          gap: 8px;
        }

        .star-btn { transform-origin: center; }

        .star-btn:hover .star-empty,
        .star-btn:hover .star-filled {
          transform: scale(1.2);
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .form-group { margin-bottom: 1.5rem; }

        .form-group input,
        .form-group textarea,
        .category-select {
          width: 100%;
          padding: 1rem;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          background: rgba(255,255,255,0.8);
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-text-primary);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .category-select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(245, 108, 10, 0.1);
        }

        .form-submit {
          width: 100%;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1.1rem;
        }

        .form-submit:disabled {
          background-color: #dcd6ce;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .success-message {
          text-align: center;
          padding: 4rem 1rem;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          background-color: var(--color-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.5rem;
        }

        .error-icon {
          background-color: #e53e3e;
        }

        @media (min-width: 992px) {
          .reviews-content {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Reviews;
