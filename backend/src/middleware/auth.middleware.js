import { token } from "../utils/token.js";

/**
 * This is doc string
 * how this fubnction works is by returning, userId and email
 *
 */
export const isLoggedIn = (req, res, next) => {
  try {
    const user = token.verify(req.cookies.token);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }
    req.user = {
      userId: user.sub,
      email: user.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
  }
};

export const authMiddleware = {
  isLoggedIn,
};
