import express from "express";
import { checkUser } from "../middlewares/auth.js";
import { getAIHint } from "../controllers/aiController.js";

const router = express.Router();

// Ask AI for hint
router.post("/hint", checkUser, getAIHint);

export default router;
