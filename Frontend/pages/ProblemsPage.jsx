import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/problems?page=${page}`)
      .then((res) => {
        setProblems(res.data.problems);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Error fetching problems", err));
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10">
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
            {problems.map((problem) => (
              <tr key={problem._id} className="hover:bg-gray-900 transition">
                <td className="p-3 border-b border-gray-700">
                  <Link to={`/problems/${problem._id}`} className="text-blue-400 hover:underline">
                    {problem.title}
                  </Link>
                </td>
                <td className="p-3 border-b border-gray-700">{problem.difficulty}</td>
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
