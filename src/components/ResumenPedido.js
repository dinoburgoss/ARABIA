import React, { useContext } from 'react';
import { PedidoContext } from '../context/PedidoContext';

const ResumenPedido = () => {
  const { carrito } = useContext(PedidoContext);

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => {
      const precioExtras = item.extras?.reduce((acc, extra) => acc + (extra.precio || 0), 0) || 0;
      return total + item.precio * item.cantidad + precioExtras * item.cantidad;
    }, 0);
  };

  const subtotal = calcularSubtotal();

  return (
    <div style={{
      backgroundColor: '#1E1E1E',
      color: '#EAEAEA',
      padding: '20px',
      borderRadius: '12px',
      maxWidth: '500px',
      margin: '20px auto',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    }}>
      <h3 style={{ color: '#FFD700', marginBottom: '15px' }}>📋 Resumen del pedido</h3>
      {carrito.map((item, index) => (
        <div key={index} style={{
          backgroundColor: '#121212',
          padding: '10px 15px',
          borderRadius: '8px',
          marginBottom: '12px'
        }}>
          <p style={{ marginBottom: '5px' }}>
            {item.nombre} x{item.cantidad} = ${item.precio * item.cantidad}
          </p>
          {item.extras?.length > 0 && (
            <ul style={{ marginLeft: '20px', fontSize: '0.95rem', color: '#ccc' }}>
              {item.extras.map((extra, i) => (
                <li key={i}>➕ {extra.nombre} (+${extra.precio})</li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <p style={{ fontWeight: 'bold' }}>Subtotal: ${subtotal}</p>
      <p style={{ fontWeight: 'bold' }}>💰 Total final: ${subtotal}</p>
    </div>
  );
};

export default ResumenPedido;
