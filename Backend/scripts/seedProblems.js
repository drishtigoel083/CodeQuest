import mongoose from "mongoose";
import dotenv from "dotenv";
import Problem from "../models/Problem.js";

dotenv.config();

// const mongoURL = ;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

const problems = [
  {
    title: "Two Sum",
    description: "Given an array of integers, return indices of two numbers such that they add up to a target. Input will be given as a string where the first part is the array followed by the target.",
    difficulty: "Easy",
    testCases: [
      { input: "4 2 7 11 15 9", output: "0 1" },
      { input: "3 3 2 4 6", output: "1 2" },
    ],
  },
  {
    title: "Reverse String",
    description: "Write a function that reverses a string. The input will be provided as a string.",
    difficulty: "Easy",
    testCases: [
      { input: "hello", output: "olleh" },
      { input: "world", output: "dlrow" },
    ],
  },
  {
    title: "Valid Parentheses",
    description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Input will be a string of parentheses.",
    difficulty: "Medium",
    testCases: [
      { input: "(){}", output: "true" },
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" }
    ],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters. The input will be a string.",
    difficulty: "Hard",
    testCases: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb", output: "1" },
      { input: "pwwkew", output: "3" }
    ],
  },
  {
    title: "Check Even or Odd",
    description: "Write a function that checks if a number is even or odd. The input will be a string containing a single integer.",
    difficulty: "Easy",
    testCases: [
      { input: "4", output: "Even" },
      { input: "7", output: "Odd" }
    ],
  },
  {
    title: "Factorial of a Number",
    description: "Given a number, return its factorial. The input will be a string containing a single integer.",
    difficulty: "Easy",
    testCases: [
      { input: "5", output: "120" },
      { input: "3", output: "6" }
    ],
  },
  {
    title: "Fibonacci Sequence",
    description: "Write a function that returns the nth Fibonacci number. The input will be a string containing the integer n.",
    difficulty: "Medium",
    testCases: [
      { input: "5", output: "5" },
      { input: "7", output: "13" }
    ],
  },
  {
    title: "Find Maximum of Three Numbers",
    description: "Given three numbers, return the largest one. The input will be a string containing three space-separated integers.",
    difficulty: "Easy",
    testCases: [
      { input: "3 7 5", output: "7" },
      { input: "1 2 3", output: "3" }
    ],
  },
  {
    title: "Check Prime Number",
    description: "Write a function that checks if a number is prime. The input will be a string containing a single integer.",
    difficulty: "Medium",
    testCases: [
      { input: "7", output: "true" },
      { input: "10", output: "false" }
    ],
  }
];

const seedDB = async () => {
  await Problem.deleteMany();  
  await Problem.insertMany(problems);  
  console.log("Database seeded successfully!");
  mongoose.connection.close();  
};

seedDB();
