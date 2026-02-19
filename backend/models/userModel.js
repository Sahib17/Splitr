import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({});

const User = mongoose.model("User", userSchema);
