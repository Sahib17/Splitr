import { authService } from "../services/auth.service.js";
import { password } from "../utils/password.js";
import { token } from "../utils/token.js";
import { authValidator } from "../validators/auth.validator.js";

const register = async (req, res) => {
  try {
    const result = authValidator.register.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ errors: result.error.flatten().fieldErrors });
    }
    const validatedData = result.data;
    const hashedPassword = await password.hash(validatedData.password);
    validatedData.password = hashedPassword;
    const user = await authService.register(validatedData);
    const jwtToken = token.create(user.email, user._id);
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ success: true, user });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || "internal server failure" });
  }
};

const login = async (req, res) => {
  try {
    const result = authValidator.login.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ errors: result.error.flatten().fieldErrors });
    }
    const user = await authService.login(result.data);
    const jwtToken = token.create(user.email, user._id);
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true, message: "Logged In"});
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

const logout = (req, res) => {
  res
    .clearCookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
    })
    .json({ success: true, message: "User logged out" });
};

const me = async (req, res) => {
  try {
    const user = token.verify(req.cookies.token);
    if (!user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }
    const userData = await authService.me(user.sub);
    return res.status(200).json({ success: true, userData });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

export const authController = {
  register,
  login,
  logout,
  me
};
