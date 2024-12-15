import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import HeaderBig from "../components/header-big";
import Card from "../tree/components/card";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Hook para redirigir

  const isPasswordSecure = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Verificar seguridad de la contraseña
    if (!isPasswordSecure(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."
      );
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error desconocido al registrarse.");
      }

      setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        navigate('/home');
      },1000);
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (

    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderBig />
      <div className="py=12">
        <form className="" onSubmit={handleSignup}>
          <Card title="Crear Cuenta">

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

            <input
              type="text"
              placeholder="Usuario"
              className="w-full mb-4 p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full mb-4 p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirmar Contraseña"
              className="w-full mb-4 p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Registrarse
            </button>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Signup;
