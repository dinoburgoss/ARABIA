// src/components/LocationInput.js
import React, { useState } from "react";

const LocationInput = ({ setLocationUrl }) => {
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setLocationUrl(url);
        setLoading(false);
      },
      (error) => {
        alert("No se pudo obtener tu ubicación.");
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={handleGetLocation} style={{ padding: "10px", backgroundColor: "#ffa500", color: "#fff", border: "none", cursor: "pointer" }}>
        {loading ? "Obteniendo ubicación..." : "📍 Compartir ubicación"}
      </button>
    </div>
  );
};

export default LocationInput;
