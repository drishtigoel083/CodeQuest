import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaUserCircle, FaSignOutAlt, FaCamera } from "react-icons/fa";
import LeetCodeChart from "../components/Chart";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/auth/profile");
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
      await api.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    window.location.href = "/";
  };

  const handleUpdateProfilePic = async () => {
    if (!newProfilePic.trim()) return;

    try {
      const response = await api.post(
        "/api/auth/updateProfilePic",
        { profilePic: newProfilePic }
      );

      setUser((prev) => ({ ...prev, profilePic: response.data.profilePic }));
      setEditing(false);
      setNewProfilePic("");
    } catch (err) {
      console.error("Error updating profile picture:", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans selection:bg-emerald-500/30 font-sans flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Sidebar - User Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-[#0b1120] border border-slate-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center relative overflow-hidden backdrop-blur-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none h-32" />
            
            <div className="relative group cursor-pointer" onClick={() => setEditing(!editing)}>
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-slate-800 shadow-xl object-cover"
                />
              ) : (
                <FaUserCircle className="text-8xl text-slate-600 bg-slate-800 rounded-full border-4 border-slate-800" />
              )}
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaCamera className="text-white text-2xl" />
              </div>
            </div>

            {editing && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 w-full flex flex-col items-center gap-3"
              >
                <input
                  type="text"
                  placeholder="Paste image URL here"
                  value={newProfilePic}
                  onChange={(e) => setNewProfilePic(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                />
                <div className="flex gap-2 w-full">
                  <button
                    onClick={handleUpdateProfilePic}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-2 rounded-lg transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            <div className="text-center mt-6 w-full">
              <h2 className="text-3xl font-black text-white">{user?.username}</h2>
              <p className="text-slate-400 font-medium">{user?.email}</p>
            </div>

            <div className="w-full mt-8 pt-6 border-t border-slate-800 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Member Since</span>
                <span className="text-white font-semibold">2026</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Total Solved</span>
                <span className="text-emerald-400 font-bold text-lg">{user?.solvedQues?.length || 0}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-8 w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-3 rounded-xl transition font-bold"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Right Content - Dashboard Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 flex flex-col gap-8"
        >
          <div className="bg-[#0b1120] border border-slate-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-emerald-500">Dashboard</span> Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <p className="text-slate-400 text-sm font-semibold mb-1">Easy</p>
                <h3 className="text-3xl font-black text-white">{user?.solvedQues ? user.solvedQues.filter(q => q.difficulty?.toLowerCase() === 'easy').length : 0}</h3>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                <p className="text-slate-400 text-sm font-semibold mb-1">Medium</p>
                <h3 className="text-3xl font-black text-white">{user?.solvedQues ? user.solvedQues.filter(q => q.difficulty?.toLowerCase() === 'medium').length : 0}</h3>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <p className="text-slate-400 text-sm font-semibold mb-1">Hard</p>
                <h3 className="text-3xl font-black text-white">{user?.solvedQues ? user.solvedQues.filter(q => q.difficulty?.toLowerCase() === 'hard').length : 0}</h3>
              </div>
            </div>

            {/* Submissions Section */}
            <div className="mt-8 pt-8 border-t border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6">Solved Problems</h3>
              
              {user?.solvedQues && user.solvedQues.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-900 text-slate-400 text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="p-4 border-b border-slate-800">Problem Title</th>
                        <th className="p-4 border-b border-slate-800 w-32">Difficulty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {user.solvedQues.map((problem) => (
                        <tr key={problem._id} className="hover:bg-slate-800/50 transition">
                          <td className="p-4 text-white font-medium">
                            {problem.title || "Unknown Problem"}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded border
                              ${problem.difficulty?.toLowerCase() === 'easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                problem.difficulty?.toLowerCase() === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                                problem.difficulty?.toLowerCase() === 'hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                                'bg-slate-500/10 text-slate-400 border-slate-500/20'
                              }
                            `}>
                              {problem.difficulty || "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-center flex-col text-center">
                  <p className="text-4xl mb-3">🧩</p>
                  <p className="text-slate-500">No questions solved yet. Start coding!</p>
                </div>
              )}
            </div>

            {/* Optional Chart */}
            {user?.solvedQues && user.solvedQues.length > 0 && (
              <div className="mt-8 bg-slate-900 border border-slate-800 p-6 rounded-xl flex justify-center">
                <div className="w-full max-w-sm">
                  <LeetCodeChart solvedQues={user.solvedQues} />
                </div>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProfilePage;
