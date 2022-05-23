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
app.delete("./api/notes/:id", function (req, res) {
  const toDelete = parseInt(req.params.id);
  readFileAsync("./db/db.json", "utf8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      const newNotes = [];
      for (let i = 0; i < notes.length; i++) {
        if (toDelete !== notes[i].id) {
          newNotes.push(notes[i]);
        }
      }
      return newNotes;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.send("successfully saved!");
    });
});

//HTML Routes