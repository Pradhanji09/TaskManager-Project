require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/authRoutes")); // /login, /register
app.use("/", require("./routes/taskRoutes")); // /tasks (protected)

app.get("/", (req, res) => {
  res.render("index"); // Homepage
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
