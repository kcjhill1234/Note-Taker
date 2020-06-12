const util = require("util");
const fs = require("fs");
const path = require("path")
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const readFile = util.promisify(fs.readFile);

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

app.get("/notes", (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'notes.html')));

app.get("/api/notes", async (req, res) => {
    const fileContent = await readFile(path.resolve(__dirname, 'db', 'db.json'));
    const db = JSON.parse(fileContent);
    res.json(db);
    
})

app.listen(PORT, () => console.log("App listening on PORT: " + PORT));