import express from "express";
import Problem from "../models/Problem.js";
import { checkUser } from "../middlewares/auth.js";

const router = express.Router();

// GET all problems (with pagination)
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const problems = await Problem.find().skip(skip).limit(limit);
    const total = await Problem.countDocuments();

    res.json({
      problems,
      total,
      totalPages: Math.ceil(total / limit),
      page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET a single problem by ID
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get(":id/verify",checkUser,async(req,res)=>{
  //logic fro verification of code and sending appropriate response message
})

export default router;
