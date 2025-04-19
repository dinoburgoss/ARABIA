// src/pages/Login.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();
  const { loginConGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, clave);
      navigate("/");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await loginConGoogle();
      navigate("/");
    } catch (error) {
      alert("Error al iniciar sesión con Google");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", background: "#111", padding: "30px", borderRadius: "10px", color: "#fff" }}>
      <h2 style={{ marginBottom: "20px", color: "#ffc107" }}>Iniciar sesión</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          placeholder="Contraseña"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />

        <button type="submit" style={{ width: "100%", padding: "10px", background: "#4FC3F7", color: "#000", fontWeight: "bold", border: "none", borderRadius: "6px", marginBottom: "10px" }}>
          Ingresar
        </button>
      </form>

      <button
        onClick={handleLoginGoogle}
        style={{
          width: "100%",
          padding: "10px",
          background: "#fff",
          color: "#000",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
        }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width="20" />
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;
