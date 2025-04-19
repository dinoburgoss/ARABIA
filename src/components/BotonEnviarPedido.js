import React, { useContext } from 'react';
import { PedidoContext } from '../context/PedidoContext';

const EnviarPedido = () => {
  const {
    carrito,
    direccion,
    ubicacion,
    metodoPago,
    nombreCliente,
  } = useContext(PedidoContext);

  if (carrito.length === 0) return null;

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const mensaje = `
🛍 *Nuevo Pedido Burger Queen* 🍔

👤 *Cliente:* ${nombreCliente || 'No informado'}

📦 *Productos:*
${carrito
    .map(
      (item) =>
        `- ${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}`
    )
    .join('\n')}

💰 *Total:* $${total}

💳 *Pago:* ${metodoPago || 'No especificado'}

📍 *Dirección:* ${
    direccion || (ubicacion ? `https://www.google.com/maps?q=${ubicacion.lat},${ubicacion.lng}` : 'No especificada')
  }
`;

  const mensajeCodificado = encodeURIComponent(mensaje);
  const numeroWhatsApp = '5493886419273'; // Reemplazá por el número real de tu local
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

  return (
    <div style={{ padding: 20 }}>
      <a
        href={urlWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          backgroundColor: '#25D366',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        📲 Enviar pedido por WhatsApp
      </a>
    </div>
  );
};

export default EnviarPedido;
