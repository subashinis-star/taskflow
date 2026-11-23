
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("./db");
const verifyToken = require("./auth");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TaskFlow API is running!");
});

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password || password.length < 8) {
      return res.status(400).json({
        message: "Username and password (at least 8 characters) required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: "Registration failed" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (!result.rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// Get logged-in user's tasks
app.get("/api/tasks", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

// Add task
app.post("/api/tasks", verifyToken, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *",
      [title.trim(), req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

// Complete task
app.put("/api/tasks/:id", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE tasks SET completed = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [Boolean(req.body.completed), req.params.id, req.user.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

// Delete task
app.delete("/api/tasks/:id", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, req.user.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("TaskFlow server running on port 5000");
});
