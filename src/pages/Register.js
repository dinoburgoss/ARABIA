// src/pages/Register.js

import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { guardarUsuarioEnFirestore } from "../utils/guardarUsuario";

const estilos = {
  contenedor: {
    maxWidth: "400px",
    margin: "60px auto",
    backgroundColor: "#111",
    padding: "30px",
    borderRadius: "12px",
    color: "#fff",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },
  titulo: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#22c55e",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#222",
    color: "#eee",
    fontSize: "15px",
  },
  boton: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#22c55e",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  botonGoogle: {
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "bold",
    fontSize: "15px",
    padding: "10px 16px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    border: "none",
    cursor: "pointer",
  }
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  const esClaveValida = (clave) => {
    const tieneMayuscula = /[A-Z]/.test(clave);
    const tieneNumero = /\d/.test(clave);
    const tieneLongitud = clave.length >= 6;
    return tieneMayuscula && tieneNumero && tieneLongitud;
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!esClaveValida(clave)) {
      return alert("La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.");
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, clave);
      await updateProfile(auth.currentUser, { displayName: nombre });
      await guardarUsuarioEnFirestore(auth.currentUser);
      navigate("/");
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await guardarUsuarioEnFirestore(result.user);
      navigate("/");
    } catch (error) {
      alert("Error con Google: " + error.message);
    }
  };

  return (
    <div style={estilos.contenedor}>
      <h2 style={estilos.titulo}>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre completo"
          required
          style={estilos.input}
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={estilos.input}
        />

        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          placeholder="Contraseña"
          required
          style={estilos.input}
        />

        <button type="submit" style={estilos.boton}>Registrarme</button>
      </form>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <button style={estilos.botonGoogle} onClick={handleGoogleRegister}>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            style={{ width: "20px", height: "20px" }}
          />
          Registrarme con Google
        </button>
      </div>
    </div>
  );
};

export default Register;
