// server/index.js
const bodyParser = require("body-parser");
const path = require('path');
const express = require("express");
const mysql = require("mysql"); 

const PORT = process.env.PORT ? process.env.PORT : 3001;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

// Create a connection to the MySQL database
var database = {
  host: "us-cdbr-east-06.cleardb.net",
  user: "b4bead580790a2",
  password: "6aca7ee4",
  database: "heroku_4a1ed73b3365c80"
};

// Connect to the MySQL database

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(database); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); //  introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

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
