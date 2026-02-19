import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  emailAddress: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  timeZone: {
    type: String,
    trim: true,
    required: true,
  },
  defaultCurrency: {
    type: String,
    trim: true,
    required: true,
  },
  language: {
    type: String,
    trim: true,
    required: true,
  },
  blocklist: {
    type: String,
    trim: true,
    required: true,
  },
});

const user = mongoose.model("user", userSchema);

export default user;