const Task = require("../models/taskModel");

// Get all task
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.render("task", { tasks, user: req.user });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).send("Error loading tasks");
  }
};
