// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const { getTasks } = require("../controller/taskController"); // ✅ Ensure correct path
const isAuth = require("../middlewares/isAuth"); // ✅ Ensure correct export

router.get("/tasks", isAuth, getTasks); // ✅ No undefined functions

module.exports = router;
