import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AdminDelivery = () => {
  const [costoDelivery, setCostoDelivery] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerCosto = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'config', 'datosGenerales'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCostoDelivery(data.costoDelivery || 0);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener costo de delivery:', error);
      }
    };
    obtenerCosto();
  }, []);

  const guardarCostoDelivery = async () => {
    try {
      await updateDoc(doc(db, 'config', 'datosGenerales'), {
        costoDelivery: parseFloat(costoDelivery)
      });
      alert('Costo de delivery actualizado con éxito');
    } catch (error) {
      console.error('Error al guardar costo de delivery:', error);
    }
  };

  if (loading) return <p style={{ color: '#fff' }}>Cargando...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', color: '#fff' }}>
      <h2 style={{ color: '#FACC15' }}>🛵 Costo de delivery</h2>
      <input
        type="number"
        value={costoDelivery}
        onChange={(e) => setCostoDelivery(e.target.value)}
        placeholder="Ingresar costo"
        style={{ width: '100%', marginBottom: 10, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <button
        onClick={guardarCostoDelivery}
        style={{ backgroundColor: '#4FC3F7', padding: 10, borderRadius: 6, color: '#000', fontWeight: 'bold' }}
      >
        💾 Guardar costo de delivery
      </button>
    </div>
  );
};

export default AdminDelivery;
