import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function estaAbiertoAhora(horarios) {
  const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const ahora = new Date();
  const dia = dias[ahora.getDay()];
  const horario = horarios[dia];

  if (!horario?.abierto) return false;

  const horaActual = ahora.getHours() + ahora.getMinutes() / 60;
  const [horaDesde, minutoDesde] = horario.desde.split(':').map(Number);
  const [horaHasta, minutoHasta] = horario.hasta.split(':').map(Number);

  const desde = horaDesde + minutoDesde / 60;
  const hasta = horaHasta + minutoHasta / 60;

  return horaActual >= desde && horaActual <= hasta;
}

const StoreStatus = () => {
  const [horarios, setHorarios] = useState({});
  const [abierto, setAbierto] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'config', 'datosGenerales'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          const horariosData = data.horarios || {};
          console.log("Horarios desde Firestore:", horariosData); // 👈 LOG para verificar datos
          setHorarios(horariosData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener horarios:', error);
        setLoading(false);
      }
    };

    fetchHorarios();

    // Opcional: actualizar estado cada 1 minuto
    const intervalo = setInterval(fetchHorarios, 60000);
    return () => clearInterval(intervalo);
  }, []);

  // Calcular si está abierto cuando los horarios ya estén cargados
  useEffect(() => {
    if (Object.keys(horarios).length > 0) {
      setAbierto(estaAbiertoAhora(horarios));
    }
  }, [horarios]);

  if (loading) return <p>Cargando estado del local...</p>;

  return (
    <div style={{
      backgroundColor: abierto ? '#d4edda' : '#f8d7da',
      color: abierto ? '#155724' : '#721c24',
      padding: '1rem',
      borderRadius: '5px',
      marginBottom: '1rem',
      fontWeight: 'bold'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        {abierto ? '🟢 El local está ABIERTO' : '🔴 El local está CERRADO'}
      </div>

      <div style={{ fontWeight: 'normal', color: '#333' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>🕒 Horarios de atención:</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(horarios).map(([dia, datos]) => (
            <li key={dia}>
              <strong style={{ textTransform: 'capitalize' }}>{dia}:</strong>{' '}
              {datos.abierto ? `${datos.desde} a ${datos.hasta}` : 'Cerrado'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoreStatus;
