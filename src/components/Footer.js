import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Todos los derechos reservados - Dino Burgos
      </p>
    </footer>
  );
};

export default Footer;
