import { useState } from "react";
import HeaderBig from "../components/header-big";
import Card from "../tree/components/card";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include", // Necesario para enviar cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error desconocido");
      }

      alert("Login exitoso");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Necesario para eliminar cookies
      });

      alert("Logout exitoso");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HeaderBig />
      <div className="py-12">
        <form className="" onSubmit={handleLogin}>
          <Card title="Iniciar Sesion">
            <>
              <input
                type="text"
                placeholder="Usuario"
                className="w-full mb-4 p-2 border rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full mb-4 p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Login
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <Link
                to="/singup"
                className="my-4"
              > No tienes usuario ? Registrate haciendo click aqui!</Link>
            </>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Login;
