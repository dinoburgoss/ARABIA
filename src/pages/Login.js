// src/pages/Login.js

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, clave);
      navigate("/");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      alert("Error con Google: " + error.message);
    }
  };

  return (
    <div style={{ background: "#111", color: "#fff", padding: "30px", maxWidth: "400px", margin: "50px auto", borderRadius: "12px", boxShadow: "0 0 12px rgba(0,0,0,0.4)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#4ade80" }}>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "1px solid #333",
            background: "#1f1f1f",
            color: "#fff"
          }}
        />

        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          placeholder="Contraseña"
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #333",
            background: "#1f1f1f",
            color: "#fff"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#22c55e",
            color: "white",
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "15px"
          }}
        >
          Iniciar sesión
        </button>
      </form>

      <button
        onClick={handleGoogle}
        style={{
          width: "100%",
          backgroundColor: "white",
          color: "#333",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
          alt="Google"
          style={{ width: "20px", height: "20px" }}
        />
        Iniciar sesión con Google
      </button>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        ¿No tenés cuenta?{" "}
        <Link to="/register" style={{ color: "#4ade80", fontWeight: "bold" }}>
          Registrate
        </Link>
      </p>
    </div>
  );
};

export default Login;
