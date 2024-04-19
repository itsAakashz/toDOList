// server.js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Create an Express app
const app = express();
const port = 3000;

// Connect to MongoDB Cloud Atlas using the connection string
const mongoDBUri =
  "mongodb+srv://itsAakashz:qwertyuiop@cluster0.htrcpwp.mongodb.net/"; // Replace with your Cloud Atlas URL

mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the to-do list items
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model for the to-do list items
const Todo = mongoose.model("Todo", todoSchema);

// Use JSON middleware
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// API route to fetch all to-do list items
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch to-dos" });
  }
});

// API route to add a new to-do list item
app.post("/api/todos", async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = new Todo({
      task,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to-do" });
  }
});

// API route to remove a to-do list item by ID
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete to-do" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
