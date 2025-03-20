import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [username, setUsername] = useState("user");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://codequest-server-3fyv.onrender.com/api/problems?page=${page}`)
      .then((res) => {
        setProblems(res.data.problems);
        setFilteredProblems(res.data.problems);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Error fetching problems", err));
  }, [page]);

  useEffect(() => {
    axios
      .get("https://codequest-server-3fyv.onrender.com/api/auth/profile", { withCredentials: true })
      .then((res) => setUsername(res.data.username))
      .catch((err) => console.error("Error fetching username", err));
  }, []);

  useEffect(() => {
    const filtered = problems.filter(problem => 
      problem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProblems(filtered);
  }, [searchQuery, problems]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "hard":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center">
      {/* Navbar */}
      <div className="w-full flex justify-end p-4 bg-gray-800 fixed top-0 left-0 right-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/profile")}> 
          <FaUserCircle className="text-2xl" />
          <span className="text-lg">{username}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-3/4 mt-20 mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search problems..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 w-3/4 rounded-full bg-gray-700 text-white focus:outline-none text-left px-4 shadow-md"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6">Problem List</h1>

      <div className="w-3/4 overflow-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-green-300">
            <tr>
              <th className="p-3 text-left border-b border-gray-700 text-black">Title</th>
              <th className="p-3 text-left border-b border-gray-700 text-black">Difficulty</th>
              <th className="p-3 text-left border-b border-gray-700 text-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => (
              <tr key={problem._id} className="hover:bg-gray-900 transition">
                <td className="p-3 border-b border-gray-700">
                  <Link to={`/problems/${problem._id}`} className="text-blue-400 hover:underline">
                    {problem.title}
                  </Link>
                </td>
                <td className={`p-3 border-b border-gray-700 font-bold ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </td>
                <td className="p-3 border-b border-gray-700"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          ⬅ Previous
        </button>
        <span className="text-lg">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default ProblemsPage;
