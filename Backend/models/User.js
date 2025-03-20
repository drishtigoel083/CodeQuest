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
    default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreesvg.org%2Fusers-profile-icon&psig=AOvVaw1-FlfF7DAoL-UVV2ATC5IH&ust=1742568231199000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLDO_-TymIwDFQAAAAAdAAAAABAE",
  }
});

export default mongoose.model("User", UserSchema);
