import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import CodeEditor from "../components/CodeEditor";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaPlay, FaCloudUploadAlt, FaChevronLeft } from "react-icons/fa";

function ProblemPage() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [testcases, setTestcases] = useState([]);

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Write your code here");
  const [input, setInput] = useState("");

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiHint, setAiHint] = useState("");

  // Expanded Language Map mapped to Judge0 standards
  const languageMap = {
    cpp: 54,
    java: 62,
    python: 71,
    javascript: 63,
    go: 60,
    rust: 73,
    csharp: 51,
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

    const checkAuth = async () => {
      try {
        await api.get("/api/auth/profile");
        // Authorized
        fetchProblem();
      } catch (err) {
        console.error("Not authenticated", err);
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, [id]);

  // RUN CODE
  const handleRun = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await api.post("/api/execution/run", {
        code,
        language: languageMap[language],
        input,
      });

      setOutput(res.data.output || res.data.error);
    } catch (error) {
      setOutput("Error running code:\\n" + (error.response?.data?.error || error.message));
    }

    setLoading(false);
  };

  // SUBMIT CODE
  const handleSubmit = async () => {
    setSubmitLoading(true);

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

    setSubmitLoading(false);
  };

  // ASK AI (Gemini)
  const handleAskAI = async () => {
    setAiLoading(true);
    setAiHint("");
    setShowAiModal(true);

    try {
      const res = await api.post("/api/ai/hint", {
        code,
        language: language,
        problemTitle: problem.title,
        problemDescription: problem.description,
        errorOutput: output.toLowerCase().includes("error") || output.toLowerCase().includes("failed") || submissionResult?.status !== "Accepted" ? output : ""
      });

      setAiHint(res.data.hint);
    } catch (error) {
      setAiHint("Sorry, the AI assistant encountered an error while analyzing your code. Please ensure the backend is connected and configured with a GEMINI_API_KEY.");
    }

    setAiLoading(false);
  };

  const getDifficultyStyles = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "medium": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "hard": return "text-red-400 bg-red-500/10 border-red-500/20";
      default: return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  if (!problem) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent flex rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans selection:bg-emerald-500/30 flex flex-col h-screen overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* LEFT SIDE - Problem Description */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 flex flex-col bg-[#0b1120] border border-slate-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-4">
              <Link to="/problems" className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition">
                <FaChevronLeft />
              </Link>
              <h1 className="text-xl font-bold text-white">{problem.title}</h1>
            </div>
            <span className={`px-3 py-1 text-xs font-bold uppercase rounded-md border ${getDifficultyStyles(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-auto p-6 custom-scrollbar">
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed text-lg mb-8">{problem.description}</p>
            </div>

            <h3 className="text-lg font-bold text-white mb-4 mt-8">Testcases Example</h3>
            <div className="space-y-4">
              {testcases.slice(0, 2).map((tc, idx) => (
                <div key={tc._id || idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group">
                  <div className="absolute left-0 top-0 w-1 h-full bg-slate-700 group-hover:bg-emerald-500 transition-colors"></div>
                  <div className="mb-2">
                    <span className="font-semibold text-slate-400 text-sm tracking-wide">Input:</span>
                    <pre className="mt-1 font-mono text-sm bg-black/50 p-2 rounded text-emerald-400 break-words whitespace-pre-wrap">{tc.input}</pre>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 text-sm tracking-wide">Output:</span>
                    <pre className="mt-1 font-mono text-sm bg-black/50 p-2 rounded text-cyan-400 break-words whitespace-pre-wrap">{tc.expectedOutput}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - Code Editor */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 flex flex-col bg-[#0b1120] border border-slate-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <CodeEditor
            language={language}
            setLanguage={setLanguage}
            code={code}
            setCode={setCode}
            input={input}
            setInput={setInput}
            output={output}
            loading={loading}
            submitLoading={submitLoading}
            aiLoading={aiLoading}
            handleRun={handleRun}
            handleSubmit={handleSubmit}
            handleAskAI={handleAskAI}
            languageMap={languageMap}
          />
        </motion.div>
      </div>

      {/* AI MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0f172a] border border-violet-500/50 p-8 rounded-2xl w-full max-w-3xl shadow-[0_0_50px_rgba(139,92,246,0.15)] max-h-[90vh] overflow-y-auto custom-scrollbar relative"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
            
            <h2 className="text-3xl font-black text-center mb-6 drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 flex items-center justify-center gap-3">
              ✨ CodeQuest AI Assistant
            </h2>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 min-h-[150px]">
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center gap-4 text-violet-400 h-full py-10">
                  <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-semibold animate-pulse">Analyzing your logic & crunching tokens...</p>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none text-slate-300">
                  <p className="whitespace-pre-wrap leading-relaxed">{aiHint}</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAiModal(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3 rounded-xl transition shadow-lg"
              >
                Close Output
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* RESULT MODAL */}
      {showModal && submissionResult && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0b1120] border border-slate-800 p-8 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar relative"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
            
            <h2 className={`text-3xl font-black text-center mb-6 drop-shadow-md ${submissionResult.status.toLowerCase().includes("accepted") ? "text-emerald-500" : "text-red-500"}`}>
              {submissionResult.status}
            </h2>

            <div className="space-y-4">
              {submissionResult.results.map((r, i) => (
                <div key={i} className={`p-4 rounded-xl border ${r.status === 'Accepted' ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-300">Test Case {i + 1}</span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${r.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {r.status}
                    </span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><span className="text-slate-500 font-mono">Input:</span> <span className="text-slate-300">{r.input}</span></p>
                    <p><span className="text-slate-500 font-mono">Expected:</span> <span className="text-cyan-400">{r.expected}</span></p>
                    <p><span className="text-slate-500 font-mono">Output:</span> <span className={r.status === 'Accepted' ? 'text-emerald-400' : 'text-red-400'}>{r.output}</span></p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3 rounded-xl transition shadow-lg"
              >
                Close Output
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ProblemPage;