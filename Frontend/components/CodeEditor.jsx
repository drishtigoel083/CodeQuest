import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, setLanguage, code, setCode, handleSubmit, output, loading }) => {
  return (
    <div className="w-1/2 p-4 bg-gray-950 text-white flex flex-col">
      {/* Language Selection */}
      <div className="mb-2">
        <label className="mr-2">Language:</label>
        <select
          className="bg-gray-800 text-white px-2 py-1"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      {/* Code Editor */}
      <Editor
        height="400px"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
      />

      {/* Submit Button */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-300 text-black px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>

      {/* Output Display */}
      <div className="mt-4 bg-gray-900 p-2 rounded text-white">
        <h3 className="text-lg font-semibold">Output:</h3>
        <pre className="text-sm">{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
