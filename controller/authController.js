const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exist try to login");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user in DB

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Redirecting another route
    res.redirect("/tasks");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in authcontroller");
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

    res.redirect("/tasks");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in authcontroller");
  }
};
