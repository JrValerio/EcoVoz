import React from 'react';
import '../assets/styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} EcoVoz. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
