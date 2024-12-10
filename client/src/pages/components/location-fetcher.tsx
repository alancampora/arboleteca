import { useEffect, useState } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
}

export default function LocationFetcher (){
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    // Solicita la ubicación
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err: GeolocationPositionError) => {
       setError('No se pudo obtener la ubicación. Asegúrate de permitir el acceso.' + err);
      }
    );
  }, []);

  return (
    <div>
      <h2>Ubicación Actual</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : location.latitude !== null && location.longitude !== null ? (
        <p>
          Latitud: {location.latitude} <br />
          Longitud: {location.longitude}
        </p>
      ) : (
        <p>Cargando ubicación...</p>
      )}
    </div>
  );
};
