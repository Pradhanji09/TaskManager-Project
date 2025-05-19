// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  getTasks,
  creatTask,
  deleteTask,
  editTask,
  completeTask,
} = require("../controller/taskController");
const { isAuth } = require("../middlewares/isAuth");

// All Task routes
router.get("/tasks", isAuth, getTasks);
router.post("/tasks", isAuth, creatTask);
router.post("/tasks/delete/:id", isAuth, deleteTask);
router.post("/tasks/edit/:id", editTask);
router.post("/tasks/complete/:id", completeTask);

module.exports = router;
