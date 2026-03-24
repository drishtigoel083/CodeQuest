import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  tags: [String],
}, { timestamps: true });

export default mongoose.model("Problem", problemSchema);