import React from 'react';

function LocationButton({ setLocation }) {
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalización no soportada");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        alert("Ubicación cargada correctamente");
      },
      () => {
        alert("No se pudo obtener la ubicación");
      }
    );
  };

  return <button onClick={getLocation}>📍 Compartir ubicación</button>;
}

export default LocationButton;
