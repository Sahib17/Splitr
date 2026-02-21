import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["GROUP", "FRIEND"],
      required: true,
    },
    image: {
      type: String,
      trim: true,
      required: false,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    expenses: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Expense",
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
