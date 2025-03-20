import express from "express";
import Problem from "../models/Problem.js";
import { checkUser } from "../middlewares/auth.js";


import axios from "axios";

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
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

function convertToJson(code, lang, input) {
  
  const jsonData = {
    "clientId": process.env.CLIENT_ID,
    "clientSecret": process.env.CLIENT_SECRET,
    "script": code,           
    "stdin": input || "",              
    "language": lang,                  
    "versionIndex": "2",               
    "compileOnly": false               
  };

  return jsonData;
}


function getJDoodleLanguages(language) {
  const lan = {
      java: "java",          
      python: "python3",     
      cpp: "cpp17",          
      javascript: "nodejs",  
  };

  return lan[language];

}
// GET a single problem by ID
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.post("/:id/verify",checkUser, async (req, res) => {
  let { code, language } = req.body;
const problem = await Problem.findById(req.params.id);
let allOutputsMatch = true;  
let resultOfCompilation=[];
for (let i = 0; i < problem.testCases.length; i++) {
  const testCase = problem.testCases[i];
  const input = testCase.input;
  const expectedOutput = testCase.output;
  

  try {
    
    const response = await axios.post('https://api.jdoodle.com/v1/execute', 
      convertToJson(code, getJDoodleLanguages(language), input));

    const op = response.data;
    resultOfCompilation.push({
      output:op.output,
      runtime : op.cpuTime,
      memory : op.memory

    });
    
    const output = response.data.output.trim().replace(/\s+/g, '');  
    const cleanExpectedOutput = expectedOutput.trim().replace(/\s+/g, '');  

    if (output !== cleanExpectedOutput) {
      allOutputsMatch = false;  
      break;  
    }
  } catch (error) {
    console.error('Error with test case execution:', error);
    allOutputsMatch = false;  
    break;  
  }
}

if (allOutputsMatch) {
  let user = req.user;
  if (!user.solvedQues.includes(req.params.id)) {
    user.solvedQues.push(req.params.id);
    await user.save();
  }
  res.json({message:"Correct Submission",result : resultOfCompilation});
}
else{
  res.json({message:"incorrect Submission",result : resultOfCompilation});
}

});

export default router;
