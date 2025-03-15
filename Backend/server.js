import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors({
  origin: ["http://localhost:5173","https://codequest-frontend-0kz2.onrender.com"] ,
  credentials: true, 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
