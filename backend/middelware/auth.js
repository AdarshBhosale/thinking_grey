import jwt from "jsonwebtoken";

// auth.js - Correct middleware
const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.json({ success: false, message: "Not Authorized" });

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id; // Attach userId to req.body
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid Token" });
  }
};

export default authUser;
