const express = require("express");
const e = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.send("test"));

app.listen(PORT, () => console.log("App listening on PORT: " + PORT));