import express from "express";
import { getAllProblems, getProblemById } from "../controllers/problemController.js";


const router = express.Router();

// GET all problems 
router.get("/",getAllProblems)

//GET single problem + visible testcases
router.get("/:id", getProblemById)




export default router;
