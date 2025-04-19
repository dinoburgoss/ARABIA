
// src/pages/RecuperarClave.js

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const RecuperarClave = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRecuperar = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMensaje("📩 Correo de recuperación enviado correctamente.");
    } catch (error) {
      setMensaje("❌ Error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", background: "#111", padding: "30px", borderRadius: "10px", color: "#fff" }}>
      <h2 style={{ color: "#4FC3F7", marginBottom: "20px" }}>Recuperar contraseña</h2>

      <form onSubmit={handleRecuperar}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "6px", border: "1px solid #333", background: "#1f1f1f", color: "#fff" }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", background: "#22c55e", color: "white", fontWeight: "bold", border: "none", borderRadius: "6px" }}
        >
          Enviar enlace
        </button>
      </form>

      {mensaje && <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>{mensaje}</p>}

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/login" style={{ color: "#4FC3F7" }}>Volver al login</Link>
      </p>
    </div>
  );
};

export default RecuperarClave;
