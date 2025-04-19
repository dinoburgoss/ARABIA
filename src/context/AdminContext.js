import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [datos, setDatos] = useState(() => {
    const datosGuardados = localStorage.getItem("datosGenerales");
    return datosGuardados
      ? JSON.parse(datosGuardados)
      : {
          titulo: "Burger Queen",
          subtitulo: "Las mejores hamburguesas de la ciudad",
          alias: "burger.queen.cbu",
          nombreTitular: "BURGER QUEEN S.A.",
          cbu: "0000003100000000123456",
        };
  });

  useEffect(() => {
    localStorage.setItem("datosGenerales", JSON.stringify(datos));
  }, [datos]);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, datos, setDatos }}>
      {children}
    </AdminContext.Provider>
  );
};
