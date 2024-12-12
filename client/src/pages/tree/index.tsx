import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import { Tree } from "@/lib/types";

const TreeProfilePage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [tree, setTree] = useState<Tree>(); // State for tree data

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/trees/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tree data");
        }
        const data = await response.json();
        setTree(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchTreeData();
  }, [id]); // Dependency array includes `id`



  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* Header Section */}
      <div className="">
        <div className="bg-pattern w-full"></div>
        <div className="relative flex justify-center m-4">
          <img
            src={tree?.information?.img}
            alt={tree?.scientific_name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold">{tree?.information?.name}</h1>
        <p className="text-gray-600">{tree?.scientific_name}</p>
      </div>

      {/* Tree Details */}
      <div className="max-w-3xl mx-auto mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">Descripcion</h2>
        <p className="text-justify">{tree?.information?.summary}</p>
      </div>

      <div className="max-w-3xl mx-auto mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">Detalles</h2>
        <ul className="mt-4 space-y-2">
          <li
            className="flex justify-between text-gray-700 border-b pb-2"
          >
            <span className="font-medium">Direccion:</span>
            <span>{tree?.address}</span>
          </li>

          <li
            className="flex justify-between text-gray-700 border-b pb-2"
          >
            <span className="font-medium">Altura:</span>
            <span>{tree?.total_height}</span>
          </li>
          <li
            className="flex justify-between text-gray-700 border-b pb-2"
          >
            <span className="font-medium">Diametro:</span>
            <span>{tree?.diameter}</span>
          </li>
        </ul>
      </div>

      {/* Optional Footer */}
      <footer className="mt-8 text-center text-gray-500">
        © 2024 Tree Explorer
      </footer>
    </div>
  );
};

export default TreeProfilePage;
