import mongoose from "mongoose";
import { Schema } from "mongoose";

const userShema = new Schema({
  username: {
    type: String,
    required: true,
  },
  passowrd: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("users", userShema);

export default userModel;
