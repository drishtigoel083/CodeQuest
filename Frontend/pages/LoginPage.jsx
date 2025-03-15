import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://codequest-backend-hvzr.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login successful:", response.data);
      navigate("/Problems");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-96 p-6 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            Log In
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-black underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
