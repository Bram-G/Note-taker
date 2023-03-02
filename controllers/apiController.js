const express = require("express");
const fs = require("fs");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
let noteDb = require("../db/db.json");
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.post("/", (req, res) => {
  let userNotes = fs.readFileSync('db/db.json');
  userNotes = JSON.parse(userNotes);
  res.json(userNotes);
  let noteObj = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
  };
  userNotes.push(noteObj);
  fs.writeFileSync('db/db.json', JSON.stringify(userNotes));
  // res.json(userNotes);
});
router.get("/:id", (req, res) => {
  for (let i = 0; i < noteDb.length; i++) {
    const note = noteDb[i];
    if (note.id === req.params.id) {
      return res.json(note);
    }
  }
});
router.delete("/:id", (req, res) => {
  noteDb = noteDb.filter((note) => {
    if (note.id == req.params.id) {
      return false;
    } else {
      return true;
    }
  });
  fs.writeFile("./db/db.json", JSON.stringify(noteDb, null, 4), (err) => {
    if (err) {
      res.status(500).send("woopsie!");
      throw err;
    } else {
      res.send("data deleted");
    }
    // console.log(noteData)
    // res.send("delete request called")
  });
});

module.exports = router;
