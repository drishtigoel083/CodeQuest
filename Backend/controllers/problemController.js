import Problem from "../models/Problem.js";
import Testcase from "../models/Testcase.js";


// ✅ GET all problems (pagination)
export const getAllProblems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const problems = await Problem.find()
      .skip(skip)
      .limit(limit);

    const total = await Problem.countDocuments();

    res.json({
      problems,
      total,
      totalPages: Math.ceil(total / limit),
      page,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ✅ GET single problem + visible testcases
export const getProblemById = async (req, res) => {
  try {
    const problemId = req.params.id;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Only visible testcases
    const testcases = await Testcase.find({
      problemId,
      isHidden: false,
    });

    res.json({
      problem,
      testcases,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};