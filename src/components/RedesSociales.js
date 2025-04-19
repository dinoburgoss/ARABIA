// src/components/RedesSociales.js
import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaPhone } from 'react-icons/fa';
import './RedesSociales.css';

const RedesSociales = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
      <h3 style={{ color: '#FACC15', marginBottom: '20px' }}>Síguenos en nuestras redes:</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={28} style={{ color: '#3b5998' }} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={28} style={{ color: '#e1306c' }} />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <FaTiktok size={28} style={{ color: '#ffffff' }} />
        </a>
        <a href="https://wa.me/5493881234567" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={28} style={{ color: '#25D366' }} />
        </a>
        <a href="tel:+543881234567">
          <FaPhone size={28} style={{ color: '#00e676' }} />
        </a>
      </div>
    </div>
  );
};

export default RedesSociales;
