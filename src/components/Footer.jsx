import { Instagram, MapPin, Phone, Clock } from 'lucide-react';
import logoWhite from '../assets/maple-logo-white.png';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom orange pin icon matching the site theme
const themedIcon = L.divIcon({
  className: '',
  html: `
    <div style="position:relative; display:flex; flex-direction:column; align-items:center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="36" height="54"
           style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">
        <path d="M12 0C7.589 0 4 3.589 4 8c0 6.5 8 18 8 18s8-11.5 8-18c0-4.411-3.589-8-8-8z"
              fill="#F56C0A" stroke="white" stroke-width="1.5"/>
        <circle cx="12" cy="8" r="3.5" fill="white" opacity="0.9"/>
      </svg>
      <div style="width:14px;height:14px;border-radius:50%;background:#F56C0A;opacity:0.35;margin-top:-4px;
                  animation: pulse-map-pin 1.8s ease-out infinite;"></div>
    </div>
  `,
  iconSize: [36, 54],
  iconAnchor: [18, 54],
  popupAnchor: [0, -54],
});

const Footer = () => {
  return (
    <footer id="location" className="footer">
      <div className="container footer-content">

        {/* Column 1: Brand, Socials & Contact */}
        <div className="footer-brand">
          <a href="#home" className="logo footer-logo">
            <img src={logoWhite} alt="Maple Cafe Logo" className="footer-logo-img" />
          </a>
          <p className="footer-tagline">Your modern cafe and bakery.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/maple_et/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@maple.et" target="_blank" rel="noreferrer" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
              </svg>
            </a>
          </div>
          <div className="contact-numbers">
            <div className="info-line"><Phone size={16} /> 0954 111 777</div>
            <div className="info-line"><Phone size={16} /> 0954 111 888</div>
          </div>
        </div>

        {/* Column 2: The Map (Tile Style) */}
        <div className="footer-map">
          <div className="map-frame">
            <MapContainer
              center={[8.9877, 38.7758]}
              zoom={15}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
              zoomControl={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[8.9877, 38.7758]} icon={themedIcon} />
            </MapContainer>
          </div>
          <a href="https://maps.app.goo.gl/N73KpnQdD2Utj6NTA" target="_blank" rel="noreferrer" className="google-maps-link">
            <MapPin size={16} /> Open in Google Maps
          </a>
        </div>

        {/* Column 3: Hours */}
        <div className="footer-info">
          <div className="info-block">
            <h4>Hours</h4>
            <div className="info-line"><Clock size={16} /> Open Daily</div>
            <p className="hours-text">7:30 AM &ndash; 3:00 AM</p>
          </div>
        </div>

      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Maple Cafe. All rights reserved.</p>
      </div>

      <style>{`
        .footer {
          background-color: var(--color-text-primary);
          color: var(--color-background);
          padding: 6rem 0 2rem;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }
        
        .footer-logo {
          margin-bottom: 1rem;
          display: inline-block;
        }
        
        .footer-logo-img {
          height: 48px;
          width: auto;
          object-fit: contain;
          opacity: 0.95;
        }
        
        .footer-tagline {
          color: rgba(250, 250, 248, 0.7);
          max-width: 300px;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        
        .social-links {
          display: flex;
          gap: 1.5rem;
        }
        
        .social-links a {
          color: var(--color-background);
          opacity: 0.8;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .social-links a:hover {
          color: var(--color-primary);
          opacity: 1;
          transform: translateY(-2px);
        }
        
        .contact-numbers {
            margin-top: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .footer-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .info-block h4 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: var(--color-accent);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: var(--font-sans);
          font-size: 0.9rem;
        }
        
        .info-line {
            display: flex;
            align-items: center;
            gap: 10px;
            color: rgba(250, 250, 248, 0.9);
            margin-bottom: 0.6rem;
            font-size: 0.95rem;
        }
        
        .hours-text {
            color: rgba(250, 250, 248, 0.9);
            font-size: 0.95rem;
            margin-bottom: 0.5rem;
            padding-left: 26px;
        }
        
        .google-maps-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 0.75rem;
            color: var(--color-primary);
            font-size: 0.95rem;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .google-maps-link:hover {
            opacity: 0.8;
            transform: translateY(-2px);
        }

        .footer-map {
            width: 100%;
        }

        .map-frame {
            width: 100%;
            height: 250px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            border: none;
            position: relative;
        }
        

        @keyframes pulse-map-pin {
            0%   { transform: scale(1);   opacity: 0.35; }
            70%  { transform: scale(2.5); opacity: 0; }
            100% { transform: scale(2.5); opacity: 0; }
        }


        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(250, 250, 248, 0.1);
          color: rgba(250, 250, 248, 0.5);
          font-size: 0.75rem;
        }

        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
          }
          .footer-map {
             grid-column: 1 / -1;
          }
          .map-frame {
             height: 300px;
          }
        }
        
        @media (min-width: 1024px) {
            .footer-content {
                grid-template-columns: 1.2fr 2.5fr 1fr;
                gap: 4rem;
            }
            .footer-info {
                flex-direction: column;
                gap: 2rem;
            }
            .footer-map {
                grid-column: auto;
            }
            .map-frame {
                height: 100%;
                min-height: 250px;
            }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
