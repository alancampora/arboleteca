const trees = [
  {
    id: 1,
    name: "Roble Americano",
    image: "https://via.placeholder.com/150",
    description: "Un árbol robusto y majestuoso que puede alcanzar grandes alturas.",
  },
  {
    id: 2,
    name: "Ciprés",
    image: "https://via.placeholder.com/150",
    description: "Conífera conocida por su longevidad y su madera aromática.",
  },
  {
    id: 3,
    name: "Cerezo Japonés",
    image: "https://via.placeholder.com/150",
    description: "Famoso por sus hermosas flores rosas durante la primavera.",
  },
];

const statistics = {
  mostCommonType: "Roble Americano",
  totalTrees: 25,
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🌳 Árboles Cercanos</h1>
        <p className="text-gray-700">
          Explora los árboles más cercanos a tu ubicación y conoce más sobre ellos.
        </p>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Tarjetas de Árboles */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trees.map((tree) => (
            <div key={tree.id} className="bg-white shadow-md rounded-lg p-4">
              {/* Imagen */}
              <img
                src={tree.image}
                alt={tree.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              {/* Nombre */}
              <h2 className="text-xl font-semibold text-green-600">{tree.name}</h2>
              {/* Descripción */}
              <p className="text-gray-700 text-sm">{tree.description}</p>
            </div>
          ))}
        </div>

        {/* Estadísticas */}
        <aside className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">📊 Estadísticas</h2>
            <ul className="text-gray-700">
              <li className="mb-2">
                <strong>Tipo más común:</strong> {statistics.mostCommonType}
              </li>
              <li>
                <strong>Total de árboles:</strong> {statistics.totalTrees}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
