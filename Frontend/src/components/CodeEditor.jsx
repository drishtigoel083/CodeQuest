import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { FaPlay, FaCloudUploadAlt, FaLaptopCode, FaTerminal } from "react-icons/fa";

function CodeEditor({
  language,
  setLanguage,
  code,
  setCode,
  input,
  setInput,
  output,
  loading,
  submitLoading,
  aiLoading,
  handleRun,
  handleSubmit,
  handleAskAI,
  languageMap
}) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const capitalize = (str) => {
    if (str === "cpp") return "C++";
    if (str === "csharp") return "C#";
    if (str === "javascript") return "JavaScript";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col h-full bg-[#0b1120] rounded-2xl overflow-hidden relative">
      
      {/* TOOLBAR */}
      <div className="border-b border-slate-800 bg-slate-900/80 p-3 flex justify-between items-center z-10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
            <FaLaptopCode className="text-lg" />
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500/50 outline-none transition"
          >
            {Object.keys(languageMap).map((lang) => (
              <option key={lang} value={lang}>
                {capitalize(lang)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAskAI}
            disabled={loading || submitLoading || aiLoading}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {aiLoading ? (
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : "✨ Ask AI"}
          </button>

          <button
            onClick={handleRun}
            disabled={loading || submitLoading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaPlay className="text-emerald-500 text-xs" />
            )}
            Run
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || submitLoading}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-5 py-2 rounded-lg transition disabled:opacity-50"
          >
            {submitLoading ? (
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaCloudUploadAlt className="text-lg" />
            )}
            Submit
          </button>
        </div>
      </div>

      {/* MONACO EDITOR */}
      <div className="flex-1 w-full bg-slate-950 relative border-b border-slate-800">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
            wordWrap: "on",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            formatOnPaste: true,
          }}
        />
      </div>

      {/* I/O CONSOLE AREA */}
      <div className="h-64 flex bg-[#0b1120] p-4 gap-4">
        
        {/* Custom Input */}
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-slate-400 font-bold text-sm">
            <FaTerminal /> Custom Input
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter testcase inputs here..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-3 text-emerald-400 font-mono text-sm resize-none focus:outline-none focus:border-emerald-500/50 custom-scrollbar placeholder:text-slate-700"
          />
        </div>

        {/* Output */}
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-slate-400 font-bold text-sm">
            <FaTerminal /> Execution Output
          </div>
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-3 text-cyan-400 font-mono text-sm overflow-auto custom-scrollbar">
            {loading ? (
              <div className="flex items-center gap-3 text-slate-500 p-2">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                Executing code securely...
              </div>
            ) : output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="text-slate-600 p-2 select-none">Output will appear here after execution...</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CodeEditor;