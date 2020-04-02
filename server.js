var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.get("*", function(req, res) {
    res.json(path.join(__dirname, "index.html"));
  });

app.get("/notes", function(req, res) {
    res.json(path.join(__dirname, "notes.html"));
  });

app.listen(PORT, function() {
    console.log("App listening on http://localhost:3000/" + PORT);
  });