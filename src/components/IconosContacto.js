import React from 'react';

const IconosContacto = ({ mostrar, esEscritorio }) => {
  const estiloIcono = (color) => ({
    backgroundColor: color,
    color: 'white',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  });

  if (esEscritorio) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          zIndex: 9999,
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          opacity: mostrar ? 1 : 0,
          transform: mostrar ? 'translateY(0)' : 'translateY(-20px)',
          pointerEvents: mostrar ? 'auto' : 'none'
        }}
      >
        <a href="tel:+540000000000" style={estiloIcono('#f39c12')} title="Llamar" aria-label="Llamar">
          <i className="fas fa-phone-alt"></i>
        </a>
        <a href="https://wa.me/540000000000" style={estiloIcono('#25D366')} target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    );
  }

  // Móviles
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
      <a href="tel:+540000000000" style={estiloIcono('#f39c12')} title="Llamar" aria-label="Llamar">
        <i className="fas fa-phone-alt"></i>
      </a>
      <a href="https://wa.me/540000000000" style={estiloIcono('#25D366')} target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default IconosContacto;
