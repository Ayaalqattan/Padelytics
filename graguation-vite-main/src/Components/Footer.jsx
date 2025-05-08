import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './Footer.css'; // Import the custom CSS

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
      {/* Wave separator */}
      <div className="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave">
          <path fill="#1e3a8a" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="footer-columns">
          {/* Logo & Description */}
          <div className="footer-column">
            <h2 className="footer-title font-playfair text-4xl">Padelytics</h2>
            <div className="title-underline"></div>
            <p className="footer-description">
              Advanced analytics and performance tracking for padel players of all levels. Elevate your game with data-driven insights.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon facebook">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="social-icon twitter">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="social-icon instagram">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" className="social-icon youtube">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-subtitle">Quick Links</h3>
            <div className="subtitle-underline"></div>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  <span className="link-arrow">›</span> Performance Analytics
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <span className="link-arrow">›</span> Training Programs
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <span className="link-arrow">›</span> Match Statistics
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <span className="link-arrow">›</span> Equipment Reviews
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <span className="link-arrow">›</span> Pro Player Insights
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="footer-column">
            <h3 className="footer-subtitle">Contact Us</h3>
            <div className="subtitle-underline"></div>
            <ul className="contact-info">
              <li className="contact-item">
                <FontAwesomeIcon icon={faLocationDot} className="contact-icon" />
                <span>123 Padel Court, Sports District, City 10001</span>
              </li>
              <li className="contact-item">
                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                <span>info@padelperformance.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="newsletter-section">
          <div className="newsletter-container">
            <div className="newsletter-info">
              <h4 className="newsletter-title">Subscribe to our newsletter</h4>
              <p className="newsletter-description">Get the latest padel tips and analytics updates.</p>
            </div>
            <div className="newsletter-form-container">
              <form className="newsletter-form">
                <input  type="email"  placeholder="Your email address" className="newsletter-input"/>
                <button type="submit" className="newsletter-button">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="copyright-section">
          <p>© {currentYear} Padelytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;