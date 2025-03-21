import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import LeetCodeChart from "../components/Chart";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://codequest-server-3fyv.onrender.com/api/auth/profile", {
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
      await axios.post("https://codequest-server-3fyv.onrender.com/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    navigate("/");
  };

  const handleUpdateProfilePic = async () => {
    if (!newProfilePic.trim()) return;

    try {
      const response = await axios.post(
        "https://codequest-server-3fyv.onrender.com/api/auth/updateProfilePic",
        { profilePic: newProfilePic },
        { withCredentials: true }
      );

      setUser((prev) => ({ ...prev, profilePic: response.data.profilePic }));
      setEditing(false);
      setNewProfilePic("");
    } catch (err) {
      console.error("Error updating profile picture:", err);
    }
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

      {/* Profile Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl flex flex-col items-center">
        {/* Profile Image */}
        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-lg"
          />
        ) : (
          <FaUserCircle className="text-7xl text-gray-500" />
        )}

        {/* Change Photo Button */}
        <button
          onClick={() => setEditing(!editing)}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Change Photo
        </button>

        {/* Input Field for Image URL (Only Show When Editing) */}
        {editing && (
          <div className="mt-3 flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter image URL"
              value={newProfilePic}
              onChange={(e) => setNewProfilePic(e.target.value)}
              className="px-4 py-2 border rounded w-64"
            />
            <button
              onClick={handleUpdateProfilePic}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        )}

        {/* User Info */}
        {user && (
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        )}

        {/* Chart Component */}
        {user?.solvedQues && user.solvedQues.length > 0 ? (
          <LeetCodeChart solvedQues={user.solvedQues} />
        ) : (
          <p className="mt-6 text-gray-500">No questions solved yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
