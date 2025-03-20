import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";

function ProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    axios
      .get(`https://codequest-server-3fyv.onrender.com/api/problems/${id}`)
      .then((res) => setProblem(res.data))
      .catch((err) => console.error("Error fetching problem", err));
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://codequest-server-3fyv.onrender.com/api/problems/${id}/verify`,
        { code, language },
        { withCredentials: true }
      );

      setSubmissionResult(res.data);
      setShowModal(true); // Show modal on submission
    } catch (error) {
      setOutput("Submission failed");
    }
    setLoading(false);
  };

  if (!problem) return <p>Loading...</p>;

  return (
    <div className="flex h-screen relative">
      {/* Problem Description */}
      <div className="w-1/2 p-6 overflow-auto border-r border-gray-600 bg-white text-black">
        <h1 className="text-2xl font-bold text-black">{problem.title}</h1>
        <hr className="my-3 border-gray-600" />
        <p className={`text-sm font-semibold mb-4 
          ${problem.difficulty === "Easy" ? "text-green-400" :
            problem.difficulty === "Medium" ? "text-yellow-400" :
            "text-red-400"
          }`}
        >
          <strong>Difficulty:</strong> {problem.difficulty}
        </p>

        <p className="mt-2 text-black leading-relaxed">{problem.description}</p>

        {problem.testCases && problem.testCases.length > 0 && (
          <div className="mt-4 bg-gray-950 p-3 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-200">Example Test Cases:</h3>
            <pre className="text-black p-2 bg-white rounded-lg text-sm">
              {problem.testCases.map((test, index) => (
                <div key={index} className="mb-2">
                  <strong>Input:</strong> {test.input} <br />
                  <strong>Expected Output:</strong> {test.output}
                </div>
              ))}
            </pre>
          </div>
        )}
      </div>

      {/* Code Editor */}
      <CodeEditor
        language={language}
        setLanguage={setLanguage}
        code={code}
        setCode={setCode}
        handleSubmit={handleSubmit}
        output={output}
        loading={loading}
      />

      {/* Submission Result Modal */}
      {showModal && submissionResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            {/* Status (Correct or Incorrect) */}
            <div className="flex justify-center items-center mb-4">
              {submissionResult.message === "Correct Submission" ? (
                <span className="text-green-600 text-5xl">✅</span>
              ) : (
                <span className="text-red-600 text-5xl">❌</span>
              )}
            </div>
            <h2 className="text-xl font-bold text-center">
              {submissionResult.message}
            </h2>

            {/* Test Case Results */}
            <div className="mt-4 max-h-96 overflow-auto">
              {submissionResult.result.map((test, index) => (
                <div key={index} className="border p-3 rounded-md my-2">
                  <p><strong>Test Case {index + 1}</strong></p>
                  <p><strong>Input:</strong> {problem.testCases[index].input}</p>
                  <p><strong>Expected Output:</strong> {problem.testCases[index].output}</p>
                  <p><strong>Your Output:</strong> {test.output}</p>
                  <p><strong>Runtime:</strong> {test.runtime} sec</p>
                  <p><strong>Memory:</strong> {test.memory} KB</p>
                </div>
              ))}
            </div>

            {/* Close Button */}
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
