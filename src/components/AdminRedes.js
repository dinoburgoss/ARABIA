import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhone, FaTiktok } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AdminRedes = () => {
  const [redes, setRedes] = useState({
    telefono: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    tiktok: ''
  });

  useEffect(() => {
    const fetchRedes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contacto'));
        const data = {};
        querySnapshot.forEach(doc => {
          data[doc.id] = doc.data().valor;
        });
        setRedes((prev) => ({ ...prev, ...data }));
      } catch (error) {
        console.error('Error al obtener redes sociales:', error);
      }
    };

    fetchRedes();
  }, []);

  const handleChange = (campo, valor) => {
    setRedes((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarRedes = async () => {
    try {
      const actualizaciones = Object.entries(redes).map(([key, value]) =>
        setDoc(doc(db, 'contacto', key), { valor: value })
      );
      await Promise.all(actualizaciones);
      alert('Redes sociales actualizadas');
    } catch (error) {
      console.error('Error al guardar redes sociales:', error);
    }
  };

  const campos = [
    { key: 'telefono', label: '📞 Teléfono', icon: <FaPhone color="#1abc9c" /> },
    { key: 'whatsapp', label: '💬 WhatsApp', icon: <FaWhatsapp color="#25D366" /> },
    { key: 'facebook', label: '📘 Facebook', icon: <FaFacebook color="#3b5998" /> },
    { key: 'instagram', label: '📷 Instagram', icon: <FaInstagram color="#C13584" /> },
    { key: 'tiktok', label: '🎵 TikTok', icon: <FaTiktok color="#000" /> }
  ];

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', color: '#fff' }}>
      <h2 style={{ color: '#FACC15', marginBottom: '20px' }}>🌐 Redes sociales y contacto</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        {campos.map(({ key, label, icon }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '20px' }}>{icon}</div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4 }}>{label}</label>

              {key === 'whatsapp' ? (
                <PhoneInput
                  country={'ar'}
                  value={redes.whatsapp}
                  onChange={(value) => handleChange('whatsapp', value)}
                  inputStyle={{
                    width: '100%',
                    backgroundColor: '#1f1f1f',
                    border: '1px solid #444',
                    color: '#fff',
                    borderRadius: 6,
                    paddingLeft: 48
                  }}
                  buttonStyle={{
                    backgroundColor: '#1f1f1f',
                    border: 'none'
                  }}
                  dropdownStyle={{
                    backgroundColor: '#111',
                    color: '#fff',
                    border: '1px solid #333',
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}
                  searchStyle={{
                    backgroundColor: '#1a1a1a',
                    color: '#eee',
                    border: 'none',
                    borderBottom: '1px solid #333',
                    borderRadius: 0,
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                  searchPlaceholder="Buscar país"
                />
              ) : (
                <input
                  type="text"
                  placeholder={`Ingresar ${label}`}
                  value={redes[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  style={{
                    width: '100%',
                    padding: 10,
                    borderRadius: 6,
                    border: '1px solid #444',
                    backgroundColor: '#1f1f1f',
                    color: '#fff'
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={guardarRedes}
        style={{
          marginTop: 20,
          backgroundColor: '#4FC3F7',
          padding: '10px 20px',
          border: 'none',
          borderRadius: 6,
          fontWeight: 'bold',
          cursor: 'pointer',
          color: '#000'
        }}
      >
        💾 Guardar redes
      </button>
    </div>
  );
};

export default AdminRedes;
