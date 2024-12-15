import { Link } from 'react-router-dom';
import HeaderBig from '../components/header-big';

export default function LandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col ">
      <HeaderBig/>

      <section className="flex-grow flex flex-col px-6 py-12  items-center">
        <p className="text-xl text-gray-700 mb-4">
          🌱 <strong>Identifica los árboles a tu alrededor</strong> según tu ubicación.
        </p>
        <p className="text-xl text-gray-700 mb-4">
          🚶Sali de tu casa, <strong>camina unas cuadras</strong> y aprende curiosidades acerca del arbol que tienes cerca.
        </p>
        <p className="text-xl text-gray-700">
          🌍 <strong>Conecta con la naturaleza</strong> y conviértete en un protector del entorno.
        </p>

        <div className="my-4 flex flex-col sm:flex-row justify-items-center items-center gap-4">
          <Link
            to="/explore"
            className="px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-500 transition duration-300"
          >
            🌿 ¡Empieza a explorar!
          </Link>
          <Link
            to="/Login"
            className="px-6 py-3 bg-orange-400 text-white text-lg rounded-lg shadow-md hover:bg-orange-500 transition duration-300"
          >
            🍁 ¡Logeate, explora y suma puntos!
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 Arboleteca. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
