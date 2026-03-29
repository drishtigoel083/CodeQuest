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
  const [input, setInput] = useState(""); // 🔥 NEW

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // 🔥 Language Map
  const languageMap = {
    cpp: 54,
    python: 71,
    javascript: 63,
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await api.get(`api/problems/${id}`);
        setProblem(res.data.problem);
        setTestcases(res.data.testcases);
      } catch (error) {
        console.error("Error fetching problem", error);
      }
    };

    fetchProblem();
  }, [id]);

  // 🟢 RUN CODE
  const handleRun = async () => {
    setLoading(true);

    try {
      const res = await api.post("/api/execution/run", {
        code,
        language: languageMap[language],
        input,
      });

      setOutput(res.data.output || res.data.error);

    } catch (error) {
      setOutput("Error running code");
    }

    setLoading(false);
  };

  // 🔵 SUBMIT CODE
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await api.post("/api/execution/submit", {
        code,
        language: languageMap[language],
        problemId: id,
      });

      setSubmissionResult(res.data);
      setShowModal(true);

    } catch (error) {
      setOutput("Submission failed");
    }

    setLoading(false);
  };

  if (!problem) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">

      {/* LEFT SIDE */}
      <div className="w-1/2 p-6 overflow-auto border-r bg-white">
        <h1 className="text-2xl font-bold">{problem.title}</h1>

        <p className="mt-2">{problem.description}</p>

        {/* Testcases */}
        {testcases.map((tc) => (
          <div key={tc._id} className="mt-3 p-2 bg-gray-100 rounded">
            <p><b>Input:</b> {tc.input}</p>
            <p><b>Output:</b> {tc.expectedOutput}</p>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <CodeEditor
        language={language}
        setLanguage={setLanguage}
        code={code}
        setCode={setCode}
        input={input}
        setInput={setInput}
        output={output}
        loading={loading}
        handleRun={handleRun}
        handleSubmit={handleSubmit}
      />

      {/* MODAL */}
      {showModal && submissionResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/2">

            <h2 className="text-xl font-bold text-center">
              {submissionResult.status}
            </h2>

            {submissionResult.results.map((r, i) => (
              <div key={i} className="border p-2 my-2">
                <p><b>Input:</b> {r.input}</p>
                <p><b>Expected:</b> {r.expected}</p>
                <p><b>Your Output:</b> {r.output}</p>
                <p><b>Status:</b> {r.status}</p>
              </div>
            ))}

            <button
              onClick={() => setShowModal(false)}
              className="mt-3 bg-blue-500 text-white px-3 py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemPage;