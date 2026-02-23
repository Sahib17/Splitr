import mongoose from "mongoose";
import User from "../models/User.js";
import { password } from "../utils/password.js";

const register = async (data) => {
  try {
    const { name, email, phone, password, defaultCurrency, language } = data;
    const user = User.create({
      name,
      email,
      phone,
      password,
      defaultCurrency,
      language,
    });
    return user;
  } catch (error) {
    if (error.code === 11000) {
      const error = new Error("Email already exists");
      error.statusCode(400);
      throw error;
    }
    throw error;
  }
};

const login = async (data) => {
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }
    const isMatch = await password.compare(data.password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }
    return user;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
};

export const authService = {
  register,
  login,
};
