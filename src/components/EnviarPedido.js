import React, { useContext, useState } from 'react';
import { PedidoContext } from '../context/PedidoContext';
import generarMensajeWhatsApp from '../utils/generarMensajeWhatsApp';

const EnviarPedido = () => {
  const {
    carrito,
    direccion,
    ubicacion,
    metodoPago,
    nombreCliente,
    vaciarCarrito,
  } = useContext(PedidoContext);

  const [comentario, setComentario] = useState('');

  if (!Array.isArray(carrito) || carrito.length === 0) return null;

  const urlUbicacion = ubicacion
    ? `https://www.google.com/maps?q=${ubicacion.lat},${ubicacion.lng}`
    : null;

  const mensaje = `
🛍 *Nuevo Pedido Burger Queen* 🍔

👤 *Cliente:* ${nombreCliente || 'No informado'}

📦 *Productos:*
${generarMensajeWhatsApp(carrito)}

💳 *Pago:* ${metodoPago || 'No especificado'}

📍 *Dirección:* ${direccion || 'No especificada'}
${urlUbicacion ? `📌 *Ubicación:* ${urlUbicacion}` : ''}

📝 *Comentario:* ${comentario || 'Sin comentario'}
  `;

  const mensajeCodificado = encodeURIComponent(mensaje);
  const numeroWhatsApp = '5493886419273'; // Cambiar por el número real
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

  const datosIncompletos = !nombreCliente || (!direccion && !ubicacion);

  return (
    <div
      className="contenedor-boton-whatsapp"
      style={{
        padding: 20,
        position: 'relative',
        marginTop: '40px',
        textAlign: 'center',
      }}
    >
      {/* Campo para comentario adicional */}
      <textarea
        placeholder="Comentario adicional (opcional)"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '14px',
          marginBottom: '12px',
          resize: 'none',
        }}
      />

      <a
        href={datosIncompletos ? '#' : urlWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (datosIncompletos) {
            e.preventDefault();
            alert('Por favor completá nombre, apellido y dirección o ubicación antes de enviar el pedido.');
          } else {
            vaciarCarrito();
          }
        }}
        style={{
          display: 'inline-block',
          backgroundColor: datosIncompletos ? '#888' : '#25D366',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: datosIncompletos ? 'not-allowed' : 'pointer',
        }}
      >
        📲 Enviar pedido por WhatsApp
      </a>

      {datosIncompletos && (
        <p style={{ marginTop: '8px', color: '#f1c40f', fontSize: '13px' }}>
          ⚠️ Ingresá tus datos para habilitar el envío.
        </p>
      )}

      <style>{`
        @media (max-width: 350px) {
          .contenedor-boton-whatsapp {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default EnviarPedido;
