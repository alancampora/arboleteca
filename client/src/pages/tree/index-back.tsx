import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tree } from '../../lib/types';
import Header from "../components/header";

const TreeDetailPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [tree, setTree] = useState<Tree>(); // State for tree data
  const [error, setError] = useState(null); // State for error handling

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

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!tree) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-stone-100 h-lvh ">
      <Header />

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center mb-6">
          <img
            src={tree?.information?.img || "https://via.placeholder.com/400"}
            alt={tree.scientific_name}
            className="w-80 h-80 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Details</h2>
          <p><strong>Type:</strong> {tree.type}</p>
          <p><strong>Total Height:</strong> {tree.total_height || "N/A"}</p>
          <p><strong>Diameter:</strong> {tree.diameter || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default TreeDetailPage;
