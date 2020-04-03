const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let newId = 0;

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    res.json(JSON.parse(data));
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/notes", function (req, res) {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    const notes = JSON.parse(data);
    req.body.id = newId;
    newId++;
    notes.push(req.body);
    fs.writeFile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(notes),
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
        res.json(req.body);
      }
    );
  });
});

app.delete("/api/notes/:id", function (req, res) {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    const notes = JSON.parse(data);
    notes.push(req.body);
    fs.writeFile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(notes),
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      }
    );
  });
  res.json();
});

app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});

//TODO: check why note text doesn't render in index.js
