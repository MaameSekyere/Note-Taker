//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { parse } = require("path");

//handling async processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//setting up server
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static middleware
app.use(express.static("./public"));

//API Route | "GET" request
app.get("/api/notes", function (req, res) {
  readFileAsync("./db/db.json", "utf8").then(function (data) {
    const notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

//API Route | "POST" request
app.post("/api/notes", function (req, res) {
  const note = req.body;
  readFileAsync("./db/db.json", "utf8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1;
      notes.push(note);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.json(note);
    });
});

//API Route | "DELETE" request
app.delete("/api/notes/:id", function (req, res) {
  readFileAsync("./db/db.json", "utf8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      return notes;
    })
    .then(function (notes) {
      console.log(notes);

      var final = notes.filter((note) => note.id !== req.params.id);
      console.log(notes.id);
      return final;
    })
    .then(function (newNotes) {
      writeFileAsync("./db/db.json", JSON.stringify(newNotes));
      res.send("successfully saved!");
    });
});

//HTML Routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../NOTE-TAKER/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../NOTE-TAKER/public/index.html"));
});

//listen
app.listen(PORT, function () {
  console.log("App listening on PORT", +PORT);
});
