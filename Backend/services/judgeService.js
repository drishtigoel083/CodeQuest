import axios from "axios";

const JUDGE_URL = "https://judge0-ce.p.rapidapi.com/submissions";

export const executeCode = async (source_code, language_id, stdin) => {
  try {
    // 🔐 Encode inputs
    const encodedCode = Buffer.from(source_code).toString("base64");
    const encodedInput = Buffer.from(stdin || "").toString("base64");

    const res = await axios.post(
      `${JUDGE_URL}?base64_encoded=true&wait=true`,
      {
        source_code: encodedCode,
        language_id,
        stdin: encodedInput,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    const data = res.data;

    // 🔓 Decode outputs safely
    const decode = (value) =>
      value ? Buffer.from(value, "base64").toString() : "";

    return {
      stdout: decode(data.stdout),
      stderr: decode(data.stderr),
      compile_output: decode(data.compile_output),
      message: decode(data.message),
      status: data.status,
      time: data.time,
      memory: data.memory,
    };

  } catch (err) {
    console.error("Judge0 Error:", err.message);
    throw new Error("Execution failed");
  }
};