// src/components/RutaPrivada.js

import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RutaPrivada = ({ children, soloAdmin = false }) => {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (soloAdmin && usuario.rol !== "admin") {
    return (
      <div style={{ padding: "50px", textAlign: "center", color: "#fff" }}>
        <h2>🚫 Acceso denegado</h2>
        <p>No tenés permisos para ver esta sección.</p>
      </div>
    );
  }

  return children;
};

export default RutaPrivada;
