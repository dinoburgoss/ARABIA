import { Link } from 'react-router-dom';

import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    nombreComercio: "",
    horarios: {},
    telefono: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    alias: "",
    titular: "",
    cbu: "",
    costoDelivery: "",
    formasPago: {
      efectivo: true,
      "al retirar": true,
      transferencia: true
    }
  });

  const [loading, setLoading] = useState(true);
  const docRef = doc(db, "config", "datosGenerales");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData({ ...formData, ...docSnap.data() });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const datosAGuardar = {
        ...formData,
        costoDelivery: parseInt(formData.costoDelivery || 0)
      };

      await setDoc(docRef, datosAGuardar);
      alert("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error al guardar datos:", error);
      alert("Hubo un error al guardar");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePagoToggle = (metodo) => {
    setFormData((prev) => ({
      ...prev,
      formasPago: {
        ...prev.formasPago,
        [metodo]: !prev.formasPago[metodo]
      }
    }));
  };

  if (loading) return <p>Cargando datos...</p>;

  const diasOrdenados = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto", color: "#fff" }}>
      <h2 style={{ color: "#FFD700", textAlign: "center" }}>Panel de Administración Completo</h2>

      <h3>🏪 Nombre del comercio</h3>
      <input
        type="text"
        name="nombreComercio"
        placeholder="Nombre del comercio"
        value={formData.nombreComercio}
        onChange={handleChange}
        style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius: '6px' }}
      />

      <h3>📅 Horarios por día</h3>
      {diasOrdenados.map((dia) => {
        const datos = formData.horarios?.[dia] || { abierto: false };
        return (
          <div key={dia} style={{ marginBottom: 10 }}>
            <label style={{ textTransform: 'capitalize', display: 'block' }}>{dia}</label>
            <input type="checkbox" checked={datos.abierto} onChange={(e) => setFormData(prev => ({
              ...prev,
              horarios: {
                ...prev.horarios,
                [dia]: {
                  ...datos,
                  abierto: e.target.checked
                }
              }
            }))} />
            {datos.abierto && (
              <>
                <input type="time" value={datos.desde || ''} onChange={(e) => setFormData(prev => ({
                  ...prev,
                  horarios: {
                    ...prev.horarios,
                    [dia]: {
                      ...datos,
                      desde: e.target.value
                    }
                  }
                }))} />
                <input type="time" value={datos.hasta || ''} onChange={(e) => setFormData(prev => ({
                  ...prev,
                  horarios: {
                    ...prev.horarios,
                    [dia]: {
                      ...datos,
                      hasta: e.target.value
                    }
                  }
                }))} />
              </>
            )}
          </div>
        );
      })}

      <h3>📱 Redes y contacto</h3>
      <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
      <input type="text" name="whatsapp" placeholder="WhatsApp" value={formData.whatsapp} onChange={handleChange} />
      <input type="text" name="instagram" placeholder="Instagram" value={formData.instagram} onChange={handleChange} />
      <input type="text" name="facebook" placeholder="Facebook" value={formData.facebook} onChange={handleChange} />
      <input type="text" name="tiktok" placeholder="TikTok (opcional)" value={formData.tiktok} onChange={handleChange} />

      <h3>💳 Datos bancarios</h3>
      <input type="text" name="alias" placeholder="Alias" value={formData.alias} onChange={handleChange} />
      <input type="text" name="cbu" placeholder="CBU" value={formData.cbu} onChange={handleChange} />
      <input type="text" name="titular" placeholder="Titular" value={formData.titular} onChange={handleChange} />

      <h3>🛵 Costo de delivery</h3>
      <input type="number" name="costoDelivery" placeholder="Costo" value={formData.costoDelivery} onChange={handleChange} />

      <h3>💰 Formas de pago</h3>
      {Object.entries(formData.formasPago).map(([key, value]) => (
        <label key={key} style={{ display: 'block', marginBottom: '4px' }}>
          <input type="checkbox" checked={value} onChange={() => handlePagoToggle(key)} /> {capitalizar(key.replace(/([a-z])([A-Z])/g, '$1 $2'))}
        </label>
      ))}

      <button onClick={handleSave} style={{ marginTop: 20, backgroundColor: '#FFD700', color: '#000', padding: '10px 20px', border: 'none', borderRadius: '6px' }}>Guardar todo</button>
    </div>
  );
};

export default AdminPanel;
