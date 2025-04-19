import React, { useEffect } from "react";
import { auth } from "./firebase";

const TestFirebase = () => {
  useEffect(() => {
    if (!auth) {
      console.error("❌ auth no está definido");
    } else {
      console.log("✅ auth está conectado");
      console.log("Contenido de auth:", auth);
    }
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center", color: "#fff" }}>
      <h2>Test Firebase Auth</h2>
      <p>Revisá la consola del navegador (F12 → Console)</p>
    </div>
  );
};

export default TestFirebase;
