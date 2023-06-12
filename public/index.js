// server/index.js
const bodyParser = require("body-parser");
const path = require('path');
const express = require("express");
const mysql = require("mysql"); // added require statement for mysql module

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/api", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tasks_db"
});

// Connect to the MySQL database
connection.connect();

// GET endpoint for retrieving all tasks
app.get("/tasks", (req, res) => {
  connection.query("SELECT * FROM tasks", (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});

// POST endpoint for adding a new task
app.post("/tasks", (req, res) => {
  const newTask = {
    name: req.body.name,
    dueDate: req.body.dueDate,
    category: req.body.category
  };
  connection.query("INSERT INTO tasks SET ?", newTask, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      newTask.id = results.insertId;
      res.json(newTask);
    }
  });
});

// PUT endpoint for updating an existing task
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = {
    name: req.body.name,
    dueDate: req.body.dueDate,
    category: req.body.category
  };
  connection.query("UPDATE tasks SET ? WHERE id = ?", [updatedTask, taskId], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else if (results.affectedRows === 0) {
      res.status(404).send("Task not found");
    } else {
      updatedTask.id = taskId;
      res.json(updatedTask);
    }
  });
});

// DELETE endpoint for deleting an existing task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  connection.query("DELETE FROM tasks WHERE id = ?", taskId, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else if (results.affectedRows === 0) {
      res.status(404).send("Task not found");
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
