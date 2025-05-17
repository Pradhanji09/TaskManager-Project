const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRES_IN;
// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists. Try logging in.");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Setting cookie
    res.cookie("token", token);

    // Redirecting another route
    res.redirect("/tasks");
  } catch (error) {
    console.log("Register Error:", error.message);
    res.status(500).send("Server error");
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Checking user exist or not
    const user = await User.findOne({ email });
    if (!user) return res.send("Not registered");

    // Matching password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Password Incorrect");

    // Creating token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Setting cookie
    res.cookie("token", token);

    res.redirect("/tasks");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in authcontroller");
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  // Clear the JWT token from the client-side (if applicable)
  res.clearCookie("token");
  // For example, if you're using cookies, you can clear the cookie here
  res.redirect("/");
};
