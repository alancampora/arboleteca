import { useEffect, useState } from 'react';
import { MdPlace } from "react-icons/md";
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { Tree } from '../../lib/types';

function NearestTree() {
  const [trees, setTrees] = useState([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        fetch(`http://localhost:3000/nearest/tree?lat=${latitude}&long=${longitude}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            setTrees(data);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
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
    <div className="bg-stone-100 h-lvh p-2">
      <div className="text-center m-2">
        <h1 className="text-5xl">Que arbol tengo cerca ?</h1>
      </div>
      {isLoading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {!error && !isLoading && trees.length === 0 && <p>No se encontraron arboles en la cercania.</p>}
      <div className="flex flex-wrap gap-4 justify-center items-stretch">
        {trees.map((tree: Tree) => (
          <div className="w-full h-full sm:w-1/2 md:w-1/3 lg:w-1/5 m-2">
            <div className="rounded-t-lg bg-emerald-500 p-4 ">
              <p className="text-center text-xl text-white text-bold font-semibold">{tree?.information?.name}</p>
            </div>
            <div>
              <img src={tree.information?.img} />
            </div>
            <div className="bg-orange-200 p-4">
              <p className="text-justify">{tree.information?.summary}</p>
            </div>
            <div className="bg-orange-200 p-4">

              <div className="flex items-center justify-center">
                <MdPlace className="text-emerald-500"/>
                <p className="text-justify">{tree.address}</p>

              </div>
            </div>

          </div>


        ))}
      </div>
    </div>
  );
}

export default NearestTree;
