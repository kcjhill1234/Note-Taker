const util = require("util");
const fs = require("fs");
const path = require("path")
const express = require("express");
const app = express();
const uuid = require('uuid')
const PORT = process.env.PORT || 3000;

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const where = path.resolve(__dirname, 'db', 'db.json')


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

app.get("/notes", (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'notes.html')));

app.get("/api/notes", async (req, res) => {
    const fileContent = await readFile(path.resolve(__dirname, 'db', 'db.json'));
    const db = JSON.parse(fileContent);
    res.json(db);
});

app.post("/api/notes", async (req, res) => {
    const newNote = req.body;
    const note = JSON.parse(await readFile(where, { encoding: 'utf-8'}));
    newNote.id = uuid.v4();
    note.push(newNote);
    await writeFile(where, JSON.stringify(note));
    res.json(newNote);
})
app.delete("/api/notes/:id", async (req, res) => {
    const noteId = req.params.id; 
    const note = JSON.parse(await readFile(where, { encoding: 'utf-8'}))
        .filter(note => note.id !== noteId);
    await writeFile(where, JSON.stringify(note));
    res.send('deleted');

});

app.listen(PORT, () => console.log("App listening on PORT: " + PORT));