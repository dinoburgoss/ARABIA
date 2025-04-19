import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTituloComercio from './AdminTituloComercio';
import AdminHorarios from './AdminHorarios';
import AdminCuenta from './AdminCuenta';
import AdminRedes from './AdminRedes';
import AdminDelivery from './AdminDelivery';
import AdminMenu from './AdminMenu';

const AdminDashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState('');
  const navigate = useNavigate();

  const toggleSeccion = (clave) => {
    setSeccionActiva((prev) => (prev === clave ? '' : clave));
  };

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ color: '#FACC15' }}>Panel de Administración</h2>
        <button onClick={() => navigate('/')} style={{ ...botonEstilo, backgroundColor: '#f87171' }}>⬅ Volver al Cliente</button>
      </div>

      <nav style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => toggleSeccion('titulo')} style={botonEstilo}>🏪 Nombre del Comercio</button>
        <button onClick={() => toggleSeccion('horarios')} style={botonEstilo}>🕒 Horarios</button>
        <button onClick={() => toggleSeccion('cuenta')} style={botonEstilo}>💳 Cuenta Bancaria</button>
        <button onClick={() => toggleSeccion('redes')} style={botonEstilo}>🌐 Redes Sociales</button>
        <button onClick={() => toggleSeccion('delivery')} style={botonEstilo}>🛵 Delivery</button>
        <button onClick={() => toggleSeccion('menu')} style={botonEstilo}>📋 Menú</button>
      </nav>

      <div>
        {seccionActiva === 'titulo' && <AdminTituloComercio />}
        {seccionActiva === 'horarios' && <AdminHorarios />}
        {seccionActiva === 'cuenta' && <AdminCuenta />}
        {seccionActiva === 'redes' && <AdminRedes />}
        {seccionActiva === 'delivery' && <AdminDelivery />}
        {seccionActiva === 'menu' && <AdminMenu />}
      </div>
    </div>
  );
};

const botonEstilo = {
  padding: '10px 15px',
  backgroundColor: '#4FC3F7',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default AdminDashboard;
