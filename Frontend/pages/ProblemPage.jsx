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
        {
          code:code,
          language:language
        },
        {
          withCredentials: true
        }
      );
      
      
      setOutput(res.data.message);
    } catch (error) {
      setOutput("Submission failed");
    }
    setLoading(false);
  };

  if (!problem) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
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

        {/* Sample Image (Optional) */}
        {problem.image && (
          <div className="mt-4 flex justify-center">
            <img
              src={problem.image}
              alt="Sample"
              className="w-full max-w-md rounded-lg border border-gray-700"
            />
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
    </div>
  );
}

export default ProblemPage;
