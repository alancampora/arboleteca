// Lista de árboles de ejemplo
const trees = [
  {
    id: 1,
    name: "Roble Americano",
    image: "https://via.placeholder.com/150", // Reemplaza con URLs de imágenes reales
    description: "Un árbol robusto y majestuoso que puede alcanzar grandes alturas.",
  },
  {
    id: 2,
    name: "Ciprés",
    image: "https://via.placeholder.com/150", // Reemplaza con URLs de imágenes reales
    description: "Conífera conocida por su longevidad y su madera aromática.",
  },
  {
    id: 3,
    name: "Cerezo Japonés",
    image: "https://via.placeholder.com/150", // Reemplaza con URLs de imágenes reales
    description: "Famoso por sus hermosas flores rosas durante la primavera.",
  },
];

const ExplorePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-green-600 mb-8">🌳 Árboles Cercanos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {trees.map((tree) => (
          <div
            key={tree.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 text-center">
              <h2 className="text-xl font-semibold">{tree.name}</h2>
            </div>
            {/* Imagen */}
            <img
              src={tree.image}
              alt={tree.name}
              className="w-full h-48 object-cover"
            />
            {/* Descripción */}
            <div className="p-4">
              <p className="text-gray-700 text-sm">{tree.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
