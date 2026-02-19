import mongoose from "mongoose";

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
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
  amount: [
    {
      type: mopngoose.Schema.Types.ObjectId,
      ref: "Expenses",
    },
  ],
});

const expense = mongoose.model("expense", expenseSchema);

export default expense;