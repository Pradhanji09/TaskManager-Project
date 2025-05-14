require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/tasks", (req, res) => {
  res.render("task");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
