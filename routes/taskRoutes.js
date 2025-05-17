// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const { getTasks } = require("../controller/taskController"); // ✅ Ensure correct path
// ✅ Ensure correct export
const { isAuth } = require("../middlewares/isAuth");

router.get("/tasks", isAuth, getTasks); // ✅ No undefined functions

module.exports = router;
