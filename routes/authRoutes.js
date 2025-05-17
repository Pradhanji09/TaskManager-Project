const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/authController");

const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();

// Public Routes (no authentication needed)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route (user must be authenticated to log out)
router.get("/logout", isAuth, logoutUser);

module.exports = router;
