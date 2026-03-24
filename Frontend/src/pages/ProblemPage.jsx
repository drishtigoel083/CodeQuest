import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import CodeEditor from "../components/CodeEditor";

function ProblemPage() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [testcases, setTestcases] = useState([]);

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // ✅ Fetch problem + testcases
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await api.get(`api/problems/${id}`);

        setProblem(res.data.problem);
        setTestcases(res.data.testcases);

      } catch (error) {
        console.error("Error Fetching problem", error);
      }
    };

    fetchProblem();
  }, [id]);

  // ✅ Submit Code
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await api.post(
        `/submissions/submit`, // future-proof endpoint
        { code, language, problemId: id }
      );

      setSubmissionResult(res.data);
      setShowModal(true);

    } catch (error) {
      setOutput("Submission failed");
    }

    setLoading(false);
  };

  if (!problem) return <p>Loading...</p>;

  return (
    <div className="flex h-screen relative">

      {/* LEFT: Problem Description */}
      <div className="w-1/2 p-6 overflow-auto border-r border-gray-600 bg-white text-black">
        
        <h1 className="text-2xl font-bold">{problem.title}</h1>
        <hr className="my-3 border-gray-600" />

        <p className={`text-sm font-semibold mb-4 
          ${problem.difficulty === "Easy" ? "text-green-500" :
            problem.difficulty === "Medium" ? "text-yellow-500" :
            "text-red-500"
          }`}
        >
          Difficulty: {problem.difficulty}
        </p>

        <p className="mt-2 leading-relaxed">{problem.description}</p>

        {/* ✅ Testcases (NEW STRUCTURE) */}
        {testcases.length > 0 && (
          <div className="mt-4 bg-gray-100 p-3 rounded-lg">
            <h3 className="text-lg font-semibold">Example Test Cases:</h3>

            {testcases.map((tc, index) => (
              <div key={tc._id} className="mb-3 bg-white p-2 rounded">
                <p><strong>Input:</strong> {tc.input}</p>
                <p><strong>Expected Output:</strong> {tc.expectedOutput}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Code Editor */}
      <CodeEditor
        language={language}
        setLanguage={setLanguage}
        code={code}
        setCode={setCode}
        handleSubmit={handleSubmit}
        output={output}
        loading={loading}
      />

      {/* ✅ Submission Modal */}
      {showModal && submissionResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">

            <h2 className="text-xl font-bold text-center">
              {submissionResult.status}
            </h2>

            <div className="mt-4 max-h-96 overflow-auto">
              {submissionResult.results?.map((test, index) => (
                <div key={index} className="border p-3 rounded-md my-2">
                  <p><strong>Test Case {index + 1}</strong></p>
                  <p><strong>Input:</strong> {testcases[index]?.input}</p>
                  <p><strong>Expected:</strong> {testcases[index]?.expectedOutput}</p>
                  <p><strong>Your Output:</strong> {test.output}</p>
                  <p><strong>Status:</strong> {test.status}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemPage;