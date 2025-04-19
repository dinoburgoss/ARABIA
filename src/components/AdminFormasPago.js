import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AdminFormasPago = () => {
  const [formasPago, setFormasPago] = useState({ efectivo: false, transferencia: false, alRetirar: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerFormasPago = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'config', 'datosGenerales'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormasPago(data.formasPago || { efectivo: false, transferencia: false, alRetirar: false });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener formas de pago:', error);
      }
    };
    obtenerFormasPago();
  }, []);

  const guardarFormasPago = async () => {
    try {
      await updateDoc(doc(db, 'config', 'datosGenerales'), {
        formasPago
      });
      alert('Formas de pago actualizadas con éxito');
    } catch (error) {
      console.error('Error al guardar formas de pago:', error);
    }
  };

  const handleChange = (campo) => {
    setFormasPago((prev) => ({
      ...prev,
      [campo]: !prev[campo]
    }));
  };

  if (loading) return <p style={{ color: '#fff' }}>Cargando...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', color: '#fff' }}>
      <h2 style={{ color: '#FACC15' }}>💳 Formas de pago disponibles</h2>
      <label style={{ display: 'block', marginBottom: 10 }}>
        <input type="checkbox" checked={formasPago.efectivo} onChange={() => handleChange('efectivo')} /> Efectivo
      </label>
      <label style={{ display: 'block', marginBottom: 10 }}>
        <input type="checkbox" checked={formasPago.transferencia} onChange={() => handleChange('transferencia')} /> Transferencia
      </label>
      <label style={{ display: 'block', marginBottom: 10 }}>
        <input type="checkbox" checked={formasPago.alRetirar} onChange={() => handleChange('alRetirar')} /> Al retirar
      </label>
      <button onClick={guardarFormasPago} style={{ backgroundColor: '#4FC3F7', padding: 10, borderRadius: 6, color: '#000', fontWeight: 'bold' }}>💾 Guardar formas de pago</button>
    </div>
  );
};

export default AdminFormasPago;
