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

    return res.status(201).json({ success: true, user });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || "internal server failure" });
  }
};

const login = (req, res) => {
  try {
    const result = authValidator.login.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ errors: result.error.flatten().fieldErrors });
    }
    const user = authService.login(result.data);
    const jwtToken = token.create(user.email, user._id);
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

// const logout = (req, res);

// const me = (req, res);

export const authController = {
  register, login
};
