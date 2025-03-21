import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [solvedQues, setSolvedQues] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [username, setUsername] = useState("user");
  const [profilePic, setProfilePic] = useState(null);
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
      .get("https://codequest-server-3fyv.onrender.com/api/auth/profile", {
        withCredentials: true,
      })
      .then((res) => {
        setUsername(res.data.username);
        setProfilePic(res.data.profilePic);
        setSolvedQues(res.data.solvedQues.map((q) => q._id));
      })
      .catch((err) => console.error("Error fetching user data", err));
  }, []);

  useEffect(() => {
    const filtered = problems.filter((problem) =>
      problem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProblems(filtered);
  }, [searchQuery, problems]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "hard":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center px-4">
      {/* Navbar */}
      <div className="w-full flex justify-end p-4 bg-green-300 fixed top-0 left-0 right-0 shadow-md">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-600"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          )}
          <span className="text-lg font-semibold">{username}</span>
        </div>
      </div>

      {/* Card Container */}
      <div className="w-full md:w-3/4 bg-white shadow-xl rounded-xl p-10 mt-28">
        <h1 className="text-3xl font-bold mb-4 text-center">PROBLEM LIST</h1>

        
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-3 rounded-xl bg-gray-200 text-black focus:outline-none px-4 shadow-md border border-gray-300"
          />
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-lg border-collapse">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="p-4 text-left border-b border-gray-300">Title</th>
                <th className="p-4 text-left border-b border-gray-300">Difficulty</th>
                <th className="p-4 text-left border-b border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem) => (
                <tr key={problem._id} className="hover:bg-gray-100 transition">
                  <td className="p-4 border-b border-gray-300">
                    <Link to={`/problems/${problem._id}`} className="text-blue-500 hover:underline">
                      {problem.title}
                    </Link>
                  </td>
                  <td
                    className={`p-4 border-b border-gray-300 font-bold ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </td>
                  <td className="p-4 border-b border-gray-300 text-center">
                    {solvedQues.includes(problem._id) ? (
                      <span className="text-green-500 font-bold text-lg">✔</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50 hover:bg-gray-400"
        >
          ⬅ Previous
        </button>
        <span className="text-lg font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50 hover:bg-gray-400"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default ProblemsPage;
