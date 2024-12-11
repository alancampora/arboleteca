import { useEffect, useState } from 'react';
import { MdPlace } from "react-icons/md";
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { Tree } from '../../lib/types';
import Header from '../components/header';

function NearestTree() {
  const [trees, setTrees] = useState([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="bg-stone-100 h-lvh ">
      <Header />

      {isLoading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {!error && !isLoading && trees.length === 0 && <p className="text-center p-4">No se encontraron arboles en la cercania.</p>}

      {!error && !isLoading && trees.length > 0 &&
        <div className="bg-gray-100 min-h-screen flex flex-col items-center px-6">
          <div className="text-center m-2 p-2">
            <h1 className="text-2xl">Arboles alrededor</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {trees.map((tree: Tree) => (
              <div className="">
                <div className="bg-green-500 p-4 rounded-t-md">
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
                    <MdPlace className="text-emerald-500" />
                    <p className="text-justify">{tree.address}</p>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
}

export default NearestTree;
