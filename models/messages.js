import mongoose, { model, Schema } from "mongoose";

const messageSchema = new Schema({
  text: {
    type: String,
  },

  user: {
    type: String,
  },

  timestamp: {
    type: String,
    default:
      // new Date(Date.now()).getHours().toString() +
      // ":" +
      // Date(Date.now()).getMinutes().toString(),
      new Date().getHours().toString() +
      ":" +
      new Date().getMinutes().toString(),

    //    trimm down the date into DAY and TIME ( hours and seconds PM/AM) only
  },
});

const messages = model("texts", messageSchema);

export default messages;
