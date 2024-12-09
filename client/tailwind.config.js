/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Asegúrate de incluir este si tienes un archivo HTML en la raíz
    "./src/**/*.{js,ts,jsx,tsx}", // Incluye todos los archivos JS/TS/JSX/TSX de la carpeta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
