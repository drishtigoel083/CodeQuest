import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: String,
  difficulty: String,
  description: String,
  testCases: [
    {
      input: String,
      output: String,
    },
  ],
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
