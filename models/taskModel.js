const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: Date,
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
