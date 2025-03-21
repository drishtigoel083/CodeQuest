import mongoose from "mongoose";
import Problem from "../models/Problem.js";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  solvedQues :[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Problem'
  }
  ],
  profilePic : {
    type:String,
    default : "https://freesvg.org/img/abstract-user-flat-4.png",
  }
});

export default mongoose.model("User", UserSchema);
