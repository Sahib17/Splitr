import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expenses",
    },
  ],
});

const group = mongoose.model("group", groupSchema);

export default group;