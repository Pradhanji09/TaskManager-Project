const express = require("express");


const { registerUser, loginUser, logoutUser } = require("../controller/authController");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();

// No need to write `isAuth;` alone. Just use it where needed.

router.post("/register", registerUser );
router.post("/login", loginUser );
router.get("/logout", isAuth , logoutUser); // ✅ Now using isAuth correctly

module.exports = router;
