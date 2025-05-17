// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

const isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Not authenticated");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId); // Make sure your payload has userId

    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).send("Invalid token");
  }
};

module.exports = isAuth;
