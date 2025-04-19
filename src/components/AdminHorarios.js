import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AdminHorarios = () => {
  const [horarios, setHorarios] = useState({});
  const [loading, setLoading] = useState(true);

  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'horarios_v2', 'general'));
        if (docSnap.exists()) {
          setHorarios(docSnap.data());
        }
      } catch (error) {
        console.error('Error al obtener horarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, []);

  const handleHorarioChange = (dia, campo, valor) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [campo]: campo === 'activo' ? valor : valor
      }
    }));
  };

  const guardarHorarios = async () => {
    try {
      await setDoc(doc(db, 'horarios_v2', 'general'), horarios);
      alert('Horarios guardados correctamente');
    } catch (error) {
      console.error('Error al guardar horarios:', error);
      alert('❌ Error al guardar horarios');
    }
  };

  if (loading) return <p style={{ color: '#fff' }}>Cargando horarios...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: '0 auto', color: '#fff' }}>
      <h2 style={{ color: '#FACC15' }}>🕒 Horarios del local</h2>
      {dias.map((dia) => (
        <div key={dia} style={{ marginBottom: 12 }}>
          <label style={{ textTransform: 'capitalize' }}>{dia}:</label>
          <input
            type="checkbox"
            checked={horarios[dia]?.activo || false}
            onChange={(e) => handleHorarioChange(dia, 'activo', e.target.checked)}
            style={{ marginLeft: 10 }}
          />
          <input
            type="time"
            value={horarios[dia]?.desde || ''}
            onChange={(e) => handleHorarioChange(dia, 'desde', e.target.value)}
            style={{ marginLeft: 10 }}
          />
          <input
            type="time"
            value={horarios[dia]?.hasta || ''}
            onChange={(e) => handleHorarioChange(dia, 'hasta', e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </div>
      ))}

      <button
        onClick={guardarHorarios}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: '#4FC3F7',
          color: '#000',
          borderRadius: 6,
          fontWeight: 'bold'
        }}
      >
        💾 Guardar horarios
      </button>
    </div>
  );
};

export default AdminHorarios;
