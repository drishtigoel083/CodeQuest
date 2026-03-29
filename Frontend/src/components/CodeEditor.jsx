function CodeEditor({
  language,
  setLanguage,
  code,
  setCode,
  input,
  setInput,
  output,
  loading,
  handleRun,
  handleSubmit,
}) {
  return (
    <div className="w-1/2 p-4 bg-gray-900 text-white flex flex-col">

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-2 p-2 bg-gray-800"
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
      </select>

      {/* Code Area */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        className="flex-1 p-3 bg-black text-green-400 font-mono"
      />

      {/* Input Box */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Custom Input"
        className="mt-2 p-2 bg-gray-800"
      />

      {/* Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleRun}
          className="bg-green-600 px-4 py-2"
        >
          Run
        </button>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 px-4 py-2"
        >
          Submit
        </button>
      </div>

      {/* Output */}
      <div className="mt-3 p-2 bg-black h-40 overflow-auto">
        <pre>{loading ? "Running..." : output}</pre>
      </div>

    </div>
  );
}

export default CodeEditor;