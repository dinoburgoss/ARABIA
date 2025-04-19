import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhone, FaTiktok } from 'react-icons/fa';

const ContactoCliente = () => {
  const [datos, setDatos] = useState({
    telefono: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    tiktok: ''
  });

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contacto'));
        const data = {};
        querySnapshot.forEach(doc => {
          data[doc.id] = doc.data().valor;
        });
        setDatos(data);
      } catch (error) {
        console.error('Error al obtener los datos de contacto:', error);
      }
    };

    fetchDatos();
  }, []);

  const iconStyle = {
    fontSize: '28px',
    background: '#1f1f1f',
    borderRadius: '50%',
    padding: '12px',
    boxShadow: '0 0 10px rgba(255,255,255,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px'
  };

  const iconHoverStyle = {
    transform: 'scale(1.1)',
    boxShadow: '0 0 15px rgba(255,255,255,0.3)'
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.currentTarget.style, iconHoverStyle);
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.currentTarget.style, iconStyle);
  };

  return (
    <div className="redes-sociales" style={{ textAlign: 'center', padding: '30px 10px', backgroundColor: '#111' }}>
      <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '20px', color: '#FACC15' }}>Síguenos en nuestras redes:</p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '25px' }}>
        {datos.facebook && (
          <a href={datos.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <FaFacebook color="#3b5998" size={28} />
          </a>
        )}
        {datos.instagram && (
          <a href={datos.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <FaInstagram color="#C13584" size={28} />
          </a>
        )}
        {datos.tiktok && (
          <a href={datos.tiktok} target="_blank" rel="noopener noreferrer" title="TikTok" style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <FaTiktok color="#fff" size={28} />
          </a>
        )}
        {datos.whatsapp && (
          <a href={`https://wa.me/${datos.whatsapp}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <FaWhatsapp color="#25D366" size={28} />
          </a>
        )}
        {datos.telefono && (
          <a href={`tel:${datos.telefono}`} title="Llamar" style={iconStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <FaPhone color="#1abc9c" size={28} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactoCliente;
