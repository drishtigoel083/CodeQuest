import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { checkUser } from "../middlewares/auth.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp", { expiresIn: "1h" });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "Strict", 
    maxAge: 3600000, 
  });

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.json({ message: "Login successful", user: { id: user._id, username: user.username } });
});

// Profile Route
router.get("/profile", checkUser, async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ message: "Profile not found" });
  }
  return res.status(200).json(user);
});

export default router;


//logout
router.post("/logout", (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).json({ message: "Logged out successfully" });
});
