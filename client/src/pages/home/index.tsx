import  { useEffect, useState } from 'react';

function NearestTree() {
  const [trees, setTrees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Now fetch from your endpoint with the user's actual location
        fetch(`http://localhost:3000/nearest/tree?lat=${latitude}&long=${longitude}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            setTrees(data);
          })
          .catch((err) => {
            setError(err.message);
          });
      },
      (err) => {
        setError(`Unable to retrieve location: ${err.message}`);
      },
      {
        enableHighAccuracy: true, // tries to get the best possible location
        timeout: 5000, // milliseconds
        maximumAge: 0  // no cached location
      }
    );
  }, []);

  return (
    <div>
      <h1>Que arbol tengo cerca ?</h1>
      {error && <p>Error: {error}</p>}
      {!error && trees.length === 0 && <p>No se encontraron arboles en la cercania.</p>}
      <ul>
        {trees.map((tree, index) => (
          <li key={index}>
            <strong>{tree.nombre_cientifico}</strong> at {tree.direccion_normalizada}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NearestTree;
