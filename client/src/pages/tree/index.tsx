import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import { Section, Tree } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Card from "./components/card";

const TreeProfilePage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [tree, setTree] = useState<Tree>(); // State for tree data
  const [error, setError] = useState(null); // State for error handling
  const [isLoading, setIsLoading] = useState(true); // State for error handling

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/trees/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tree data");
        }
        const data = await response.json();
        setTree(data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTreeData();
  }, [id]); // Dependency array includes `id`



  return (
    <>
      {error && <p> there was an error </p>}
      {!error && <div className="min-h-screen bg-gray-100">
        <Header />
        {/* Header Section */}
        <div className="">
          <div className="bg-pattern w-full"></div>
          <div className="relative flex justify-center m-4">
            {isLoading && <Skeleton className="w-32 h-32 rounded-full" />}
            {!isLoading && <img
              src={tree?.information?.img}
              alt={tree?.scientific_name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            }
          </div>
        </div>

        {/* Profile Info */}
        {isLoading && <div className="space-y-2 mt-4 flex items-center flex-col">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
        }

        {!isLoading && <div className="text-center mt-4">
          <h1 className="text-2xl font-bold">{tree?.information?.name}</h1>
          <p className="text-gray-600">{tree?.scientific_name}</p>
        </div>
        }

        {/* Tree Details */}
        <Card showSkeleton={isLoading} title="Resumen" text={tree?.information?.summary} />

        {/* Tree Specific Data */}
        <Card showSkeleton={isLoading} title="Caracteristicas">
          <ul className="mt-4 space-y-2">
            <li
              className="flex justify-between text-gray-700 border-b pb-2"
            >
              <span className="font-medium">Direccion:</span>
              <span>{tree?.address} </span>
            </li>

            <li
              className="flex justify-between text-gray-700 border-b pb-2"
            >
              <span className="font-medium">Altura:</span>
              <span>{`${tree?.total_height} metros`}</span>
            </li>
            <li
              className="flex justify-between text-gray-700 border-b pb-2"
            >
              <span className="font-medium">Diametro:</span>
              <span>{`${tree?.diameter} metros`}</span>
            </li>
          </ul>

        </Card>


        {tree?.information?.sections.map((section: Section) => {
          return (section.paragraphs.length > 0 && <Card
            showSkeleton={isLoading}
            title={section.heading}
            text={section.paragraphs.join()} />)
        })}


        {/* Optional Footer */}
        <footer className="mt-8 text-center text-gray-500">
          © 2024 Arboloteca
        </footer>
      </div>
      }
    </>
  );
};

export default TreeProfilePage;
