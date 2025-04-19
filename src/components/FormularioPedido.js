import React, { useContext, useEffect, useState } from 'react';
import { PedidoContext } from '../context/PedidoContext';
import EnviarPedido from './EnviarPedido';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './FormularioPedido.css';

const FormularioPedido = () => {
  const {
    metodoPago,
    setMetodoPago,
    direccion,
    setDireccion,
    setUbicacion,
    carrito,
    nombreCliente,
    setNombreCliente,
    ubicacion,
    tipoEntrega,
    setTipoEntrega
  } = useContext(PedidoContext);

  const [comentario, setComentario] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [formasPagoDisponibles, setFormasPagoDisponibles] = useState({});
  const [datosTransferencia, setDatosTransferencia] = useState({ alias: '', titular: '', cbu: '' });
  const [costoDelivery, setCostoDelivery] = useState(0);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'config', 'datosGenerales'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormasPagoDisponibles(data.formasPago || {});
          setDatosTransferencia({
            alias: data.cuenta?.alias || '',
            titular: data.cuenta?.titular || '',
            cbu: data.cuenta?.cbu || ''
          });
          setCostoDelivery(data.costoDelivery || 0);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem('nombreCliente');
    const direccionGuardada = localStorage.getItem('direccion');
    const ubicacionGuardada = localStorage.getItem('ubicacion');
    const entregaGuardada = localStorage.getItem('tipoEntrega');

    if (nombreGuardado) setNombreCliente(nombreGuardado);
    if (direccionGuardada) setDireccion(direccionGuardada);
    if (ubicacionGuardada) setUbicacion(JSON.parse(ubicacionGuardada));
    if (entregaGuardada) setTipoEntrega(entregaGuardada);
  }, []);

  useEffect(() => {
    localStorage.setItem('nombreCliente', nombreCliente);
  }, [nombreCliente]);

  useEffect(() => {
    localStorage.setItem('direccion', direccion);
  }, [direccion]);

  useEffect(() => {
    if (ubicacion) {
      localStorage.setItem('ubicacion', JSON.stringify(ubicacion));
    }
  }, [ubicacion]);

  useEffect(() => {
    localStorage.setItem('tipoEntrega', tipoEntrega);
  }, [tipoEntrega]);

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      alert('Geolocalización no es soportada por tu navegador');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUbicacion({ lat: latitude, lng: longitude });
        alert('Ubicación compartida correctamente');
      },
      (error) => {
        alert('Error al obtener la ubicación');
        console.error(error);
      }
    );
  };

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => {
      const precioExtras = item.extras?.reduce((acc, e) => acc + parseFloat(e.precio || 0), 0) || 0;
      return total + (item.precio * item.cantidad) + (precioExtras * item.cantidad);
    }, 0);
  };

  const obtenerIconoProducto = (nombre) => {
    const lower = nombre.toLowerCase();
    if (lower.includes('pizza') || lower.includes('napolitana') || lower.includes('muzza')) return '🍕';
    if (lower.includes('hamburguesa')) return '🍔';
    if (lower.includes('lomo')) return '🥪';
    if (lower.includes('milanesa')) return '🥩';
    if (lower.includes('papas') || lower.includes('fritas')) return '🍟';
    if (
      lower.includes('cerveza') ||
      lower.includes('quilmes') ||
      lower.includes('andes') ||
      lower.includes('brahma')
    ) return '🍺';
    if (
      lower.includes('manaos') ||
      lower.includes('coca') ||
      lower.includes('sprite') ||
      lower.includes('fanta') ||
      lower.includes('gaseosa') ||
      lower.includes('bebida')
    ) return '🥤';

    return '🛍️';
  };

  const costoEnvio = tipoEntrega === 'Delivery' ? costoDelivery : 0;
  const totalFinal = calcularSubtotal() + costoEnvio;

  if (carrito.length === 0) return null;

  return (
    <div className="formulario-container">
      <h3>Nombre y Apellido</h3>
      <input
        type="text"
        placeholder="Ej: Juan Pérez"
        value={nombreCliente}
        onChange={(e) => setNombreCliente(e.target.value)}
        className="formulario-input"
      />

      <h3>Tipo de entrega</h3>
      <select
        value={tipoEntrega}
        onChange={(e) => setTipoEntrega(e.target.value)}
        className="formulario-input"
      >
        <option value="">Seleccionar</option>
        <option value="Retiro">🚶 Retiro en local</option>
        <option value="Delivery">🛵 Envío a domicilio (${costoDelivery})</option>
      </select>

      {tipoEntrega === 'Delivery' && (
        <>
          <h3>Dirección</h3>
          <input
            type="text"
            placeholder="Escribí tu dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="formulario-input"
          />

          <button
            onClick={obtenerUbicacion}
            className="formulario-boton formulario-boton-ubicacion"
          >
            📍 Compartir ubicación
          </button>

          {ubicacion && (
            <div style={{ marginTop: '10px', color: '#ccc' }}>
              <strong>Ubicación compartida:</strong>{' '}
              <a
                href={`https://www.google.com/maps?q=${ubicacion.lat},${ubicacion.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1abc9c' }}
              >
                Ver en Google Maps
              </a>
            </div>
          )}
        </>
      )}

      <h3 style={{ marginTop: '20px' }}>Método de pago</h3>
      <select
        value={metodoPago}
        onChange={(e) => setMetodoPago(e.target.value)}
        className="formulario-input"
      >
        <option value="">Seleccionar</option>
        {formasPagoDisponibles?.efectivo && <option value="Efectivo">💵 Efectivo</option>}
        {formasPagoDisponibles?.alRetirar && <option value="Al retirar">🏠 Al retirar</option>}
        {formasPagoDisponibles?.transferencia && <option value="Transferencia">🏦 Transferencia</option>}
      </select>

      {metodoPago === 'Transferencia' && (
        <div
          style={{
            marginTop: '10px',
            background: '#222',
            padding: '10px',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <p><strong>CBU:</strong> {datosTransferencia.cbu}</p>
          <p><strong>Alias:</strong> {datosTransferencia.alias}</p>
          <p><strong>Titular:</strong> {datosTransferencia.titular}</p>
          <p style={{ marginTop: '10px', color: '#f1c40f', fontWeight: 'bold' }}>
            ⚠️ En caso de pagar con transferencia, enviar comprobante.
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(datosTransferencia.cbu);
              alert('CBU copiado al portapapeles');
            }}
            className="formulario-boton formulario-boton-cbu"
          >
            📋 Copiar CBU
          </button>
        </div>
      )}

      <h3 style={{ marginTop: '20px' }}>🧾 Resumen del pedido</h3>
      <ul style={{ background: '#111', padding: '10px', borderRadius: '8px', color: '#eee' }}>
        {carrito.map((item, index) => (
          <li
            key={index}
            style={{
              marginBottom: '12px',
              backgroundColor: index % 2 === 0 ? '#1a1a1a' : '#2a2a2a',
              padding: '10px',
              borderRadius: '8px'
            }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
              {obtenerIconoProducto(item.nombre)} {item.nombre} x{item.cantidad}
            </span>{' '}
            = ${item.precio * item.cantidad}
            {item.extras && item.extras.length > 0 && (
              <ul style={{ fontSize: '14px', marginLeft: '20px', marginTop: '4px', listStyleType: 'none', paddingLeft: 0 }}>
                {item.extras.map((extra, i) => (
                  <li key={i}>➕ {extra.nombre} (+${extra.precio})</li>
                ))}
              </ul>
            )}
          </li>
        ))}

        <li
          style={{
            marginTop: '10px',
            backgroundColor: '#222',
            padding: '8px 12px',
            borderRadius: '6px',
            fontWeight: '500'
          }}
        >
          Subtotal: ${calcularSubtotal()}
        </li>

        {tipoEntrega === 'Delivery' && (
          <li
            style={{
              backgroundColor: '#222',
              padding: '8px 12px',
              borderRadius: '6px',
              marginTop: '6px',
              fontWeight: '500'
            }}
          >
            Costo de envío: ${costoEnvio}
          </li>
        )}

        <li
          style={{
            marginTop: '10px',
            backgroundColor: '#333',
            padding: '10px 14px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '17px',
            color: '#fff'
          }}
        >
          Total final: ${totalFinal}
        </li>
      </ul>

      {!confirmado ? (
        <button
          onClick={() => {
            const respuesta = window.confirm('¿Estás seguro de enviar el pedido?');
            if (respuesta) {
              setConfirmado(true);
            }
          }}
          className="formulario-boton"
        >
          ✅ Confirmar y enviar pedido
        </button>
      ) : (
        <EnviarPedido comentario={comentario} />
      )}

      <button
        onClick={() => {
          localStorage.removeItem('nombreCliente');
          localStorage.removeItem('direccion');
          localStorage.removeItem('ubicacion');
          localStorage.removeItem('tipoEntrega');
          setNombreCliente('');
          setDireccion('');
          setUbicacion(null);
          setTipoEntrega('');
          setComentario('');
          setConfirmado(false);
          alert('Datos del formulario eliminados.');
        }}
        className="formulario-boton formulario-boton-limpiar"
      >
        🗑️ Limpiar datos del formulario
      </button>

      <p style={{ textAlign: 'center', marginTop: '30px', color: '#999', fontSize: '14px' }}>
        Todos los derechos reservados Dino Burgos 2025
      </p>
    </div>
  );
};

export default FormularioPedido;
