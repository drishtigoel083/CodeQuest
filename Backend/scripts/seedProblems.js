import mongoose from "mongoose";
import dotenv from "dotenv";
import Problem from "../models/Problem.js";

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/CodeQuest")
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

const problems = [
  {
    title: "Two Sum",
    description: "Given an array of integers, return indices of two numbers such that they add up to a target.",
    difficulty: "Easy",
    testCases: [
      { input: "[2,7,11,15], target=9", output: "[0,1]" },
      { input: "[3,2,4], target=6", output: "[1,2]" },
    ],
  },
  {
    title: "Reverse String",
    description: "Write a function that reverses a string.",
    difficulty: "Easy",
    testCases: [
      { input: '"hello"', output: '"olleh"' },
      { input: '"world"', output: '"dlrow"' },
    ],
  },
  {
    title: "Valid Parentheses",
    description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Medium",
    testCases: [
      { input: "'()'", output: "true" },
      { input: "'()[]{}'", output: "true" },
      { input: "'(]'", output: "false" }
    ],
  },
  {
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists and return it as a new sorted list.",
    difficulty: "Medium",
    testCases: [
      { input: "[1,2,4], [1,3,4]", output: "[1,1,2,3,4,4]" }
    ],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Hard",
    testCases: [
      { input: "'abcabcbb'", output: "3" },
      { input: "'bbbbb'", output: "1" },
      { input: "'pwwkew'", output: "3" }
    ],
  }
];


const seedDB = async () => {
  await Problem.deleteMany(); // Clear old data
  await Problem.insertMany(problems);
  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();
