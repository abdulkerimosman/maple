import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/maple-logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-content">
        <a href="#home" className="logo">
          <img src={logoImg} alt="Maple Cafe Logo" className="logo-img" />
        </a>

        {/* Desktop Nav */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <a href="tel:0954111777" className="btn-primary nav-btn">Order Now</a>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass animate-fade-in-up">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="tel:0954111777" className="btn-primary mobile-btn" onClick={() => setMobileMenuOpen(false)}>
            Order Now
          </a>
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: var(--transition-smooth);
          padding: 1.5rem 0;
        }
        .navbar.scrolled {
          padding: 1rem 0;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo-img {
          height: 52px;
          width: auto;
          object-fit: contain;
          transition: var(--transition-smooth);
        }
        .nav-links {
          display: none;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: var(--color-primary);
          transition: var(--transition-smooth);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .mobile-toggle {
          display: block;
          color: var(--color-text-primary);
        }
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .mobile-nav-link {
          font-size: 1.2rem;
          font-family: var(--font-serif);
        }
        .mobile-btn {
          margin-top: 1rem;
        }
        
        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
          .mobile-toggle {
            display: none;
          }
          .mobile-menu {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
