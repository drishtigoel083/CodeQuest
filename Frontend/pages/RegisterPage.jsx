import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://codequest-server-3fyv.onrender.com/api/auth/register", {
        username,
        email,
        password,
      });

      console.log("Registration successful:", response.data);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-96 p-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 bg-white border border-gray-400 rounded text-black outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 bg-white border border-gray-400 rounded text-black outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 bg-white border border-gray-400 rounded text-black outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
          <button
            type="submit"
            className="p-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-black underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
