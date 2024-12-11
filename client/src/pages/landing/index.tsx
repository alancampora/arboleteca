import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">

      <header className="bg-green-600 text-white text-center py-8">
        <h1 className="text-4xl font-bold">🌳 Arboleteca</h1>
        <p className="text-xl mt-2">Descubre los secretos de los árboles que te rodean</p>
      </header>

      <section className="flex-grow flex flex-col items-center text-center px-6 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Con Arboleteca, la naturaleza está a un toque de distancia.
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          🌱 <strong>Identifica los árboles a tu alrededor</strong> según tu ubicación.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          📖 Aprende curiosidades, beneficios y datos interesantes sobre ellos.
        </p>
        <p className="text-lg text-gray-700">
          🌍 <strong>Conecta con la naturaleza</strong> y conviértete en un protector del entorno.
        </p>
        <Link
          to="/explore"
          className="mt-8 px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-500 transition duration-300"
        >
          🌿 ¡Empieza a explorar!
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 Arboleteca. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
