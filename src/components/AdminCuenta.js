import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AdminCuenta = () => {
  const [datosCuenta, setDatosCuenta] = useState({ alias: '', cbu: '', titular: '' });
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const obtenerDatosCuenta = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'config', 'datosGenerales'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.cuenta) setDatosCuenta(data.cuenta);
        }
      } catch (error) {
        console.error('Error al obtener cuenta:', error);
      }
    };
    obtenerDatosCuenta();
  }, []);

  const handleChange = (campo, valor) => {
    setDatosCuenta((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarCuenta = async () => {
    try {
      await updateDoc(doc(db, 'config', 'datosGenerales'), { cuenta: datosCuenta });
      setGuardado(true);
      setTimeout(() => setGuardado(false), 2000);
    } catch (error) {
      console.error('Error al guardar cuenta:', error);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', color: '#fff' }}>
      <h2 style={{ color: '#FACC15', marginBottom: 20 }}>💳 Datos de Cuenta</h2>
      <input type="text" placeholder="Alias" value={datosCuenta.alias} onChange={(e) => handleChange('alias', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      <input type="text" placeholder="CBU" value={datosCuenta.cbu} onChange={(e) => handleChange('cbu', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      <input type="text" placeholder="Titular" value={datosCuenta.titular} onChange={(e) => handleChange('titular', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      <button onClick={guardarCuenta} style={{ backgroundColor: '#4FC3F7', padding: 10, width: '100%', fontWeight: 'bold', borderRadius: 6 }}>💾 Guardar</button>
      {guardado && <p style={{ color: '#00e676', marginTop: 10 }}>✔ Guardado correctamente</p>}
    </div>
  );
};

export default AdminCuenta;
