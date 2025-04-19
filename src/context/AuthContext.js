// src/context/AuthContext.js

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  const loginConGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const resultado = await signInWithPopup(auth, provider);
      return resultado.user;
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, logout, loginConGoogle }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
};
