import express from "express";
import { runCode } from "../controllers/runController.js";
import { submitCode } from "../controllers/submissionController.js";
import { checkUser } from "../middlewares/auth.js";

const router = express.Router();

// Run Code 
router.post("/run", runCode);

// Submit Code 
router.post("/submit", checkUser, submitCode);

export default router;