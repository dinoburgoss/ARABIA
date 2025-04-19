import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const { setIsAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      setIsAdmin(true);
      navigate("/admin");
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">Ingreso Administrador</h2>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-yellow-600 text-white px-4 py-2 rounded"
      >
        Ingresar
      </button>
    </div>
  );
};

export default Login;
