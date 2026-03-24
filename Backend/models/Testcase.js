import mongoose from "mongoose";

const testcaseSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
  },
  input: String,
  expectedOutput: String,
  isHidden: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Testcase", testcaseSchema);