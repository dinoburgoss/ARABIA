import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AdminLogo = () => {
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerLogo = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'config', 'datosGenerales'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLogo(data.logo || '');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el logo:', error);
      }
    };
    obtenerLogo();
  }, []);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const guardarLogo = async () => {
    try {
      await updateDoc(doc(db, 'config', 'datosGenerales'), {
        logo
      });
      alert('Logo actualizado con éxito');
    } catch (error) {
      console.error('Error al guardar logo:', error);
    }
  };

  if (loading) return <p style={{ color: '#fff' }}>Cargando...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', color: '#fff' }}>
      <h2 style={{ color: '#FACC15' }}>🖼️ Subir logo del comercio</h2>
      <input type="file" accept="image/*" onChange={handleImagenChange} style={{ marginBottom: 10 }} />
      {logo && <img src={logo} alt="Logo del comercio" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', marginBottom: 10 }} />}
      <button onClick={guardarLogo} style={{ backgroundColor: '#4FC3F7', padding: 10, borderRadius: 6, color: '#000', fontWeight: 'bold' }}>💾 Guardar logo</button>
    </div>
  );
};

export default AdminLogo;