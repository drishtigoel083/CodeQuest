import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://codequest-backend-hvzr.onrender.com/api/auth/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("https://codequest-backend-hvzr.onrender.com/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    navigate("/");
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Top Logout Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl flex items-center">
        {/* Profile Icon */}
        <div className="w-24 h-24 flex items-center justify-center text-gray-500">
          <FaUserCircle className="text-7xl" />
        </div>

        {/* User Info */}
        <div className="ml-6">
          {user && (
            <>
              <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
