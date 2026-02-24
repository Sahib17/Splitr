// GET    /users/:id
// PATCH  /users/
// DELETE /users/

import { userService } from "../services/user.service.js";
import { userValidator } from "../validators/user.validator.js";
import { authController } from "./auth.controller.js";

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.userId, req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

const getUserByMail = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.userID, req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

const patchUser = async (req, res) => {
  try {
    const result = userValidator.patchUser.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ errors: result.error.flatten().fieldErrors });
    }
    const validatedData = result.data;
    const user = await userService.patchUser(req.user.userId, validatedData);
    console.log(user);
    
    return res.status(200).json({success: true, user})
      
  } catch (error) {
    console.log(error)
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.user.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Couldn't delete the user" });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    });
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const userController = {
  getUserById,
  getUserByMail,
  patchUser,
  deleteUser,
};
