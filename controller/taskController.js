const Task = require("../models/taskModel");

// Get all task
exports.getTasks = async (req, res) => {
  try {
    // Finding use and sort descending order
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.render("task", { tasks, user: req.user });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).send("Error loading tasks");
  }
};

// Create new task

exports.creatTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user._id,
    });

    await newTask.save();
    res.redirect("/tasks");
  } catch (error) {
    console.error("Error creating task:", err.message);
    res.status(500).send("Failed to create task");
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    // Here it finding and delete current task from current user

    await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.redirect("/tasks");
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).send("Failed to delete task");
  }
};

// Edit task

exports.editTask = async (req, res) => {
  const taskID = await req.params.id;

  const { title, description, dueDate, priority } = req.body;

  try {
    const task = await Task.findById(taskID);

    if (!task) {
      return res.status(404).send("Task not found");
    }

    task.title = title;
    task.description = description;
    task.dueDate = dueDate ? new Date(dueDate) : null;
    task.priority = priority;

    await task.save();
    res.redirect("/tasks");
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send("Server Error");
  }
};

exports.completeTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndUpdate(taskId, { completed: true });
    res.redirect("/tasks");
  } catch (error) {
    console.error("Error completing task:", error);
    res.status(500).send("Server Error");
  }
};
