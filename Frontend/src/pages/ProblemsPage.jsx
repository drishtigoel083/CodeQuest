import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaSearch, FaCheckCircle, FaMinusCircle } from "react-icons/fa";

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [solvedQues, setSolvedQues] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetching All problems
  useEffect(() => {
    const fetchProblems = async() => {
      setLoading(true);
      try {
        const res = await api.get(`/api/problems?page=${page}`)
        setProblems(res.data.problems);
        setFilteredProblems(res.data.problems);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching problems", err)       
      } finally {
        setLoading(false);
      }
    };
    fetchProblems()
  }, [page])

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch userData
  useEffect(() => {
    const authProf = async() => {
      try {
        const res = await api.get("/api/auth/profile")
        if (res.data?.solvedQues) {
          setSolvedQues(res.data.solvedQues.map((q) => q._id));
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Error fetching user data", err)
        setIsAuthenticated(false);
      }
    }
    authProf()
  }, []);

  useEffect(() => {
    const filtered = problems.filter((problem) =>
      problem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProblems(filtered);
  }, [searchQuery, problems]);

  const getDifficultyStyles = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "hard":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans selection:bg-emerald-500/30 font-sans flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-10 flex-1 flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Practice <span className="text-emerald-500">Problems</span>
          </h1>
          <p className="text-slate-400 text-lg">Enhance your competitive programming skills here.</p>
        </motion.div>

        <div className="bg-[#0b1120] border border-slate-800 shadow-xl rounded-3xl p-6 md:p-8 flex-1 flex flex-col relative overflow-hidden backdrop-blur-lg">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
            </div>
            
            <div className="text-sm font-semibold text-slate-400 bg-slate-900 px-4 py-2 border border-slate-700 rounded-xl">
              Showing {filteredProblems.length} Problems
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900 text-slate-400 text-sm uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-5 border-b border-slate-800 font-semibold w-16 text-center">Status</th>
                  <th className="p-5 border-b border-slate-800 font-semibold">Problem Title</th>
                  <th className="p-5 border-b border-slate-800 font-semibold w-32">Difficulty</th>
                  <th className="p-5 border-b border-slate-800 font-semibold w-32 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-10 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-slate-400">Loading problems...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredProblems.length > 0 ? (
                  filteredProblems.map((problem, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={problem._id} 
                      className="hover:bg-slate-800/50 transition group"
                    >
                      <td className="p-5 text-center">
                        {solvedQues.includes(problem._id) ? (
                          <FaCheckCircle className="text-emerald-500 text-xl mx-auto drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        ) : (
                          <FaMinusCircle className="text-slate-600 text-xl mx-auto" />
                        )}
                      </td>
                      <td className="p-5">
                        <Link to={isAuthenticated ? `/problems/${problem._id}` : "/login"} className="text-white hover:text-emerald-400 font-semibold text-base transition-colors">
                          {problem.title}
                        </Link>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 text-xs font-bold uppercase rounded-md border ${getDifficultyStyles(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <Link to={isAuthenticated ? `/problems/${problem._id}` : "/login"}>
                          <button className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-900 border border-emerald-500/30 px-4 py-1.5 rounded-lg text-sm font-bold transition">
                            Solve
                          </button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-slate-500">
                      No problems found matching '{searchQuery}'
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-5 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl border border-slate-700 disabled:opacity-40 hover:bg-slate-700 transition"
              >
                Previous
              </button>
              <div className="text-slate-400 font-semibold">
                Page <span className="text-white bg-slate-800 px-3 py-1 rounded-md mx-1">{page}</span> of <span className="text-white">{totalPages}</span>
              </div>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-5 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl border border-slate-700 disabled:opacity-40 hover:bg-slate-700 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProblemsPage;

