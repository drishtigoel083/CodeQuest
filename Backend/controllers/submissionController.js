import Testcase from "../models/Testcase.js";
import Submission from "../models/Submission.js";
import { executeCode } from "../services/judgeService.js";

export const submitCode = async (req, res) => {
  const { code, language, problemId } = req.body;
  const userId = req.user?._id;

  try {
    const testcases = await Testcase.find({ problemId });

    let finalStatus = "Accepted";
    let results = [];



    const normalize = (str) =>
       (str || "").trim().replace(/\s+/g, "");

for (let i = 0; i < testcases.length; i++) {
  const tc = testcases[i];

  const result = await executeCode(code, language, tc.input);

  const status = result.status?.description;

  // ❌ 1. Compilation Error
  if (status === "Compilation Error") {
    finalStatus = "Compilation Error";

    results.push({
      input: tc.input,
      expected: tc.expectedOutput,
      output: result.compile_output,
      status: "Compilation Error",
    });

    break;
  }

  // ❌ 2. Runtime Error
  if (status !== "Accepted") {
    finalStatus = "Runtime Error";

    results.push({
      input: tc.input,
      expected: tc.expectedOutput,
      output: result.stderr || result.message,
      status: "Runtime Error",
    });

    break;
  }

  // ✅ 3. Compare Output
  const output = normalize(result.stdout);
  const expected = normalize(tc.expectedOutput);

  if (output !== expected) {
    finalStatus = "Wrong Answer";

    results.push({
      input: tc.input,
      expected,
      output,
      status: "Failed",
    });

    break;
  }

  // ✅ Passed
  results.push({
    input: tc.input,
    expected,
    output,
    status: "Passed",
  });
}

    // 💾 Save submission
    const submission = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: finalStatus,
    });

    res.json({
      status: finalStatus,
      results,
      submissionId: submission._id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Submission failed" });
  }
};