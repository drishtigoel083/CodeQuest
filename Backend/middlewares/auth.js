import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv"

dotenv.config()

export const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or Expired Token" });
    }

    try {
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; 
      next();
    } catch (error) {
      return res.status(500).json({ status: false, message: "Server error." });
    }
  });
};
