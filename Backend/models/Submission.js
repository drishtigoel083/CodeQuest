import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
 
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

  
    status: {
      type: String,
      enum: ["Accepted", "Wrong Answer", "Runtime Error"],
      required: true,
    },

    
    time: {
      type: String, 
    },

    memory: {
      type: String, 
    },

   
    testResults: [
      {
        input: String,
        expected: String,
        output: String,
        status: String, // Passed / Failed / Error
      },
    ],
  },
  { timestamps: true } 
);

export default mongoose.model("Submission", submissionSchema);