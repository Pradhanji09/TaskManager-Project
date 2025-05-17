// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  getTasks,
  creatTask,
  deleteTask,
} = require("../controller/taskController");
const { isAuth } = require("../middlewares/isAuth");

// All Task routes
router.get("/tasks", isAuth, getTasks);
router.post("/tasks", isAuth, creatTask);
router.post("/tasks/delete/:id", isAuth, deleteTask);

module.exports = router;
