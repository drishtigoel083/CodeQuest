import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/profile");
        setUser(res.data);
      } catch (err) {
        // Not logged in or error
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="bg-[#0b1120] text-slate-300 p-4 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-black tracking-tighter text-white hover:text-emerald-400 transition">Code<span className="text-emerald-500">Quest</span></h1>
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/about" className="hover:text-emerald-400 transition">
            About
          </Link>
          <Link to="/problems" className="hover:text-emerald-400 transition">
            Problems
          </Link>
          <Link to="/contact" className="hover:text-emerald-400 transition">
            Contact Us
          </Link>

          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/profile" className="text-emerald-400 font-bold hover:text-emerald-300 transition">
                Hey, {user.username}
              </Link>
              <Link to="/profile">
                {user.profilePic ? (
                  <img src={user.profilePic} alt="Profile" className="w-9 h-9 rounded-full border-2 border-emerald-500 object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-emerald-500 flex items-center justify-center text-white font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-emerald-500/10 border border-emerald-500/50 px-5 py-2 rounded-lg text-emerald-400 hover:bg-emerald-500 hover:text-slate-900 transition font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

