import { executeCode } from "../services/judgeService.js";

export const runCode = async (req, res) => {
  const { code, language, input } = req.body;

  try {
    const result = await executeCode(code, language, input);

    res.json({
      output: result.stdout,
      error: result.stderr || result.compile_output || result.message,
      status: result.status.description,
      time: result.time,
      memory: result.memory,
    });

  } catch (err) {
    res.status(500).json({ message: "Run failed" });
  }
};