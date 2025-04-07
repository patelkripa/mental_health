import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Mental Wellness. All Rights Reserved.</p>
        
        {/* Footer Links */}
        <ul className="footer-links">
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service">Terms of Service</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
