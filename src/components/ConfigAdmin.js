// ConfigAdmin.js
export const modoAdmin = true; // o false, según lo que necesites
import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ajustá la ruta según la ubicación de tu archivo firebase.js
import './ConfigAdmin.css'; // Importamos los estilos externos

const ConfigAdmin = () => {
  const [datos, setDatos] = useState({
    horarioSemana: '',
    horarioFinde: '',
    telefonoContacto: '',
    telefonoSecundario: '',
    numeroWhatsApp: '',
    aliasTransferencia: '',
    titularCuenta: '',
    cbuCuenta: ''
  });

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      const docRef = doc(db, "config", "datosGenerales");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDatos(docSnap.data());
      } else {
        setMensaje("No se encontraron datos.");
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    setGuardando(true);
    try {
      await setDoc(doc(db, "config", "datosGenerales"), datos);
      setMensaje("✅ Cambios guardados correctamente.");
    } catch (error) {
      setMensaje("❌ Error al guardar los datos.");
    }
    setGuardando(false);
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="config-container">
      <h2 className="config-titulo">⚙️ Configuración General</h2>
      {Object.keys(datos).map((campo) => (
        <div key={campo} className="config-campo">
          <label className="config-label">{formatearNombreCampo(campo)}</label>
          <input
            type="text"
            name={campo}
            value={datos[campo]}
            onChange={handleChange}
            className="config-input"
            placeholder={`Ingresar ${formatearNombreCampo(campo).toLowerCase()}`}
          />
        </div>
      ))}
      <button onClick={guardarCambios} className="config-boton" disabled={guardando}>
        {guardando ? 'Guardando...' : 'Guardar Cambios'}
      </button>
      {mensaje && <p className="config-mensaje">{mensaje}</p>}
    </div>
  );
};

// Convierte el nombre de los campos a algo más legible
const formatearNombreCampo = (campo) => {
  const palabras = campo.replace(/([A-Z])/g, ' $1');
  return palabras.charAt(0).toUpperCase() + palabras.slice(1);
};

export default ConfigAdmin;
