import { useEffect, useState } from 'react';
import { MdPlace} from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { Tree } from '../../lib/types';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import Statistics from './components/statistics';

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
        let latitude;
        let longitude;

        if (import.meta.env.VITE_ENV === "development") {
          latitude = "-34.629381"
          longitude = "-58.443557"
        } else {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        }
        // Now fetch from your endpoint with the user's actual location
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/nearest/tree?lat=${latitude}&long=${longitude}`)
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
                <div className="bg-emerald-500 p-4 rounded-t-md">
                  <p className="text-center text-xl text-white text-bold font-semibold">{tree?.information?.name}</p>
                </div>
                <div>
                  <img
                    className="w-full h-52 object-cover"
                    src={tree.information?.img} />
                </div>
                <div className="bg-orange-200 p-4 h-52 overflow-hidden">
                  <p className="text-justify break-words  text-ellipsis">{tree.information?.summary}</p>
                </div>
                <div className="bg-orange-200 p-4">

                  <div className="flex items-center justify-left mb-2">
                    <MdPlace className="text-emerald-500" />
                    <p className="text-sm text-justify lowercase first-letter:uppercase ml-2">{tree.address}</p>

                  </div>
                  {tree.metadata?.distance &&
                    <div className="flex items-center justify-left">
                      <GiPathDistance className="text-emerald-500" />
                      <p className="text-sm text-justify ml-2">{` Se encuentra a ${Math.round(parseFloat(tree.metadata.distance))} metros`}</p>

                    </div>
                  }
                </div>

                <div className="bg-emerald-500 p-4 rounded-b-md text-right">
                <Link
                  to={`/explore/${tree._id}`}
                  className="text-orange-100"
                >
                  Ver detalles
                </Link>
                </div>
              </div>

            ))}
          </div>

          <Statistics trees={trees} />
        </div>
      }
    </div>
  );
}

export default NearestTree;
