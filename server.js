const fs = require("fs");
const path = require("path")
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

app.get("/notes", (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'notes.html')));

app.listen(PORT, () => console.log("App listening on PORT: " + PORT));