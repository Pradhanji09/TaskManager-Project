const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection
// This function connects to the MongoDB database using Mongoose.

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
