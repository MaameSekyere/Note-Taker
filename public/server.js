//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

//handling async processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//setting up server
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static middleware
app.use(express.static("./public"))

