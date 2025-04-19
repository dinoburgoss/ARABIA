import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const EstadoLocal = () => {
  const [datos, setDatos] = useState({
    direccionComercio: '',
    ubicacionComercio: '',
    abierto: false,
    horarios: {},
  });

  const [verHorarios, setVerHorarios] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const docRefGeneral = doc(db, 'config', 'datosGenerales');
        const snapGeneral = await getDoc(docRefGeneral);
        if (snapGeneral.exists()) {
          const data = snapGeneral.data();
          setDatos(prev => ({
            ...prev,
            direccionComercio: data.direccionComercio || '',
            ubicacionComercio: data.ubicacionComercio || '',
          }));
        }

        const docHorarios = await getDoc(doc(db, 'horarios_v2', 'general'));
        if (docHorarios.exists()) {
          const horariosData = docHorarios.data();
          const ahora = new Date();
          const dia = ahora.toLocaleDateString('es-AR', { weekday: 'long' }).toLowerCase();
          const horaActual = ahora.getHours() + ahora.getMinutes() / 60;

          const horarioHoy = horariosData[dia];
          const abierto =
            horarioHoy?.activo &&
            parseFloat(horarioHoy.desde?.replace(':', '.') || 0) <= horaActual &&
            horaActual <= parseFloat(horarioHoy.hasta?.replace(':', '.') || 0);

          setDatos(prev => ({
            ...prev,
            abierto,
            horarios: horariosData
          }));
        }
      } catch (error) {
        console.error('❌ Error al obtener los datos del comercio:', error);
      }
    };

    obtenerDatos();
  }, []);

  const ordenarDias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  return (
    <div style={{ textAlign: 'center', margin: '20px 0', color: '#fff' }}>
      {datos.direccionComercio && <p>{datos.direccionComercio}</p>}

      {datos.ubicacionComercio && (
        <a
          href={datos.ubicacionComercio}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginBottom: 10,
            color: '#00e5ff',
            fontSize: '20px',
            textDecoration: 'none',
          }}
        >
          📍 Ver ubicación
        </a>
      )}

      <p style={{ color: datos.abierto ? 'limegreen' : 'tomato', fontWeight: 'bold', fontSize: '18px' }}>
        {datos.abierto ? '🟢 Abierto ahora' : '🔴 Cerrado en este momento'}
      </p>

      <button
        onClick={() => setVerHorarios(!verHorarios)}
        style={{
          backgroundColor: '#4FC3F7',
          color: '#000',
          padding: '8px 14px',
          borderRadius: '8px',
          marginTop: 10,
          cursor: 'pointer',
          border: 'none',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {verHorarios ? '⬆ Ocultar horarios' : '📅 Ver días de atención'}
      </button>

      {verHorarios && (
        <div style={{
          marginTop: 16,
          padding: '15px',
          background: '#111',
          borderRadius: '12px',
          border: '2px solid #4FC3F7',
          boxShadow: '0 0 12px rgba(0,0,0,0.3)',
          textAlign: 'left',
          maxWidth: 320,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {ordenarDias.map(dia => {
            const info = datos.horarios[dia];
            return (
              <div
                key={dia}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  color: info?.activo ? '#ddd' : '#666',
                  fontWeight: info?.activo ? 'normal' : 'lighter',
                }}
              >
                <span style={{ textTransform: 'capitalize' }}>{dia}:</span>
                <span>
                  {info?.activo ? `${info.desde} - ${info.hasta}` : 'Cerrado'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EstadoLocal;
