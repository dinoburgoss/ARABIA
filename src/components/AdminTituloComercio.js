import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AdminTituloComercio = () => {
  const [nombreComercio, setNombreComercio] = useState('');
  const [direccionComercio, setDireccionComercio] = useState('');
  const [tituloMenu, setTituloMenu] = useState('');
  const [ubicacionComercio, setUbicacionComercio] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const docRef = doc(db, 'config', 'datosGenerales');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombreComercio(data.nombreComercio || '');
          setDireccionComercio(data.direccionComercio || '');
          setTituloMenu(data.tituloMenu || '');
          setUbicacionComercio(data.ubicacionComercio || '');
        }
      } catch (error) {
        console.error('Error al obtener los datos del comercio:', error);
      }
    };

    obtenerDatos();
  }, []);

  const obtenerUbicacionActual = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setUbicacionComercio(url);
        },
        (err) => {
          alert('No se pudo obtener la ubicación. Asegúrate de permitir el acceso a la ubicación.');
          console.error(err);
        }
      );
    } else {
      alert('Geolocalización no compatible con este navegador.');
    }
  };

  const guardarDatos = async () => {
    try {
      const docRef = doc(db, 'config', 'datosGenerales');
      await updateDoc(docRef, {
        nombreComercio,
        direccionComercio,
        tituloMenu,
        ubicacionComercio
      });
      alert('Datos del comercio actualizados correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos del comercio:', error);
    }
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ color: '#FACC15' }}>🏪 Datos del comercio</h3>

      <input
        type="text"
        placeholder="Nombre del comercio"
        value={nombreComercio}
        onChange={(e) => setNombreComercio(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />

      <input
        type="text"
        placeholder="Dirección del comercio"
        value={direccionComercio}
        onChange={(e) => setDireccionComercio(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />

      <input
        type="text"
        placeholder="Título del menú (ej: Menú Burger Queen)"
        value={tituloMenu}
        onChange={(e) => setTituloMenu(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          type="text"
          placeholder="URL de ubicación Google Maps"
          value={ubicacionComercio}
          onChange={(e) => setUbicacionComercio(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={obtenerUbicacionActual} style={{ padding: '6px 10px', backgroundColor: '#34D399', color: '#000', borderRadius: 6 }}>
          📍 Actual
        </button>
      </div>

      <button
        onClick={guardarDatos}
        style={{ backgroundColor: '#4FC3F7', padding: 10 }}
      >
        💾 Guardar datos
      </button>
    </div>
  );
};

export default AdminTituloComercio;
